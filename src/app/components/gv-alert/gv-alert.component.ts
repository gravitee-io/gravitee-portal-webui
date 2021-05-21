/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import '@gravitee/ui-components/wc/gv-input';
import '@gravitee/ui-components/wc/gv-select';
import '@gravitee/ui-components/wc/gv-autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Alert,
  AlertStatusResponse,
  Application,
  ApplicationService,
  PermissionsService,
} from '../../../../projects/portal-webclient-sdk/src/lib';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHelpers, HttpStatus } from '../../utils/http-helpers';
import { marker as i18n } from '@biesbjerg/ngx-translate-extract-marker';
import { NotificationService } from '../../services/notification.service';

enum AlertMode {
  CREATION = 'CREATION',
  EDITION = 'EDITION',
  READING = 'READING',
}

@Component({
  selector: 'app-gv-alert',
  templateUrl: './gv-alert.component.html',
  styleUrls: ['./gv-alert.component.css'],
})
export class GvAlertComponent implements OnInit {
  @Input() mode: AlertMode;
  @Input() alert: Alert;
  @Input() maxReached: boolean;
  @Input() status: AlertStatusResponse;
  @Output() alertCreated = new EventEmitter<Alert>();
  @Output() alertDeleted = new EventEmitter<Alert>();

  application: Application;
  permissions: Array<string>;
  alertForm: FormGroup;
  types: Array<any>;
  timeUnits: Array<any>;
  httpStatus: Array<HttpStatus>;
  durations: Array<number>;
  type: string;
  statusLabel: string;
  responseTimeLabel: string;

  get isStatusAlert(): boolean {
    return 'status' === (this.isCreationMode ? this.alertForm?.value?.type?.toLowerCase() : this.alert?.type?.toLowerCase());
  }

  get isResponseTimeAlert(): boolean {
    return 'response_time' === (this.isCreationMode ? this.alertForm?.value?.type?.toLowerCase() : this.alert?.type?.toLowerCase());
  }

  get isCreationMode(): boolean {
    return this.mode === AlertMode.CREATION;
  }

  get isEditionMode(): boolean {
    return this.mode === AlertMode.EDITION;
  }

  get isReadingMode(): boolean {
    return this.mode === AlertMode.READING;
  }

  get isAlertEnabled(): boolean {
    return this.alert?.enabled;
  }

  get typeLabel(): string {
    return this.isStatusAlert ? this.statusLabel : this.responseTimeLabel;
  }

  get isAlertingEnabled() {
    return this.status?.available_plugins > 0 && this.status?.enabled;
  }

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private notificationService: NotificationService,
    private permissionsService: PermissionsService,
  ) {}

  ngOnInit(): void {
    this.application = this.route.snapshot.data.application;
    if (this.application) {
      this.permissionsService
        .getCurrentUserPermissions({ applicationId: this.application.id })
        .toPromise()
        .then((permissions) => {
          this.permissions = permissions.ALERT;
        });
    }
    this.resetAddAlert();
    this.resetAddAlertStatus();
    if (this.application) {
      this.httpStatus = [
        { value: '1xx', label: '1xx - INFORMATION' },
        { value: '2xx', label: '2xx - SUCCESS' },
        { value: '3xx', label: '3xx - REDIRECTION' },
        { value: '4xx', label: '4xx - CLIENT ERROR' },
        { value: '5xx', label: '5xx - SERVER ERROR' },
      ].concat(HttpHelpers.httpStatus);
      this.durations = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
      this.timeUnits = ['S', 'MINUTES', 'HOURS'];
      this.translateService
        .get([
          i18n('application.alerts.type.status'),
          i18n('application.alerts.type.response_time'),
          i18n('application.alerts.timeUnits.seconds'),
          i18n('application.alerts.timeUnits.minutes'),
          i18n('application.alerts.timeUnits.hours'),
        ])
        .toPromise()
        .then((translations) => {
          this.statusLabel = '' + Object.values(translations)[0];
          this.responseTimeLabel = '' + Object.values(translations)[1];
          this.types = [
            {
              label: Object.values(translations)[0],
              value: 'STATUS',
            },
            {
              label: Object.values(translations)[1],
              value: 'RESPONSE_TIME',
            },
          ];

          this.timeUnits = [
            {
              label: Object.values(translations)[2],
              value: 'SECONDS',
            },
            {
              label: Object.values(translations)[3],
              value: 'MINUTES',
            },
            {
              label: Object.values(translations)[4],
              value: 'HOURS',
            },
          ];
        });
    }
  }

  addAlert() {
    const statusOrReponseTimeBody = this.isStatusAlert
      ? {
          status_code: this.alertForm.controls.status.value,
          status_percent: this.alertForm.controls.threshold.value,
        }
      : {
          response_time: this.alertForm.controls.responseTime.value,
        };
    this.applicationService
      .createApplicationAlert({
        applicationId: this.application.id,
        alertInput: {
          ...statusOrReponseTimeBody,
          enabled: true,
          type: this.alertForm.controls.type.value,
          duration: this.alertForm.controls.duration.value,
          time_unit: this.alertForm.controls.timeUnit.value,
        },
      })
      .toPromise()
      .then((created) => {
        this.notificationService.success(i18n('application.alerts.add.success'));
        this.resetAddAlert();
        this.resetAddAlertStatus();
        this.alertCreated.emit(created);
      });
  }

  onTypeChange($event: string) {
    if ($event === 'STATUS') {
      this.resetAddAlertStatus();
    } else {
      this.resetAddAlertResponseTime();
    }
  }

  getHttpStatusLabel(value: string): string {
    return this.httpStatus.find((http) => http.value === '' + value)?.label;
  }

  reset() {
    this.resetAddAlert();
    this.resetAddAlertStatus();
  }

  resetAddAlert() {
    this.alertForm = new FormGroup({
      type: new FormControl('STATUS', [Validators.required]),
      duration: new FormControl('1'),
      timeUnit: new FormControl('MINUTES', [Validators.required]),
    });
  }

  hasDeletePermission() {
    return this.permissions?.find((p) => p === 'D');
  }

  hasCreatePermission() {
    return this.permissions?.find((p) => p === 'C');
  }

  hasUpdatePermission() {
    return this.permissions?.find((p) => p === 'U');
  }

  hasReadPermission() {
    return this.permissions?.find((p) => p === 'R');
  }

  private resetAddAlertStatus() {
    this.alertForm.addControl('status', new FormControl('4xx', [Validators.required]));
    this.alertForm.addControl('threshold', new FormControl('1', [Validators.min(1), Validators.max(100)]));
    this.alertForm.removeControl('responseTime');
  }

  private resetAddAlertResponseTime() {
    this.alertForm.removeControl('status');
    this.alertForm.removeControl('threshold');
    this.alertForm.addControl('responseTime', new FormControl('1', [Validators.min(1), Validators.max(100000)]));
  }

  edit() {
    this.mode = AlertMode.EDITION;

    const conditionalForm = this.isStatusAlert
      ? {
          status: new FormControl(this.alert.status_code, [Validators.required]),
          threshold: new FormControl('' + this.alert.status_percent, [Validators.min(1), Validators.max(100)]),
        }
      : {
          responseTime: new FormControl('' + this.alert.response_time, [Validators.min(1), Validators.max(100000)]),
        };
    this.alertForm = new FormGroup({
      duration: new FormControl(this.alert.duration),
      timeUnit: new FormControl(this.alert.time_unit.toUpperCase(), [Validators.required]),
      ...conditionalForm,
    });
  }

  delete() {
    this.applicationService
      .deleteApplicationAlert({
        applicationId: this.application.id,
        alertId: this.alert.id,
      })
      .toPromise()
      .then(() => {
        this.notificationService.success(i18n('application.alerts.delete.success'));
        this.alertDeleted.emit(this.alert);
      });
  }

  cancelEdition() {
    this.mode = AlertMode.READING;
  }

  update() {
    const statusOrReponseTimeBody = this.isStatusAlert
      ? {
          status_code: this.alertForm.controls.status.value,
          status_percent: this.alertForm.controls.threshold.value,
        }
      : {
          response_time: this.alertForm.controls.responseTime.value,
        };
    this.applicationService
      .updateAlert({
        applicationId: this.application.id,
        alertId: this.alert.id,
        alertInput: {
          ...statusOrReponseTimeBody,
          enabled: true,
          type: this.alert.type,
          duration: this.alertForm.controls.duration.value,
          time_unit: this.alertForm.controls.timeUnit.value,
        },
      })
      .toPromise()
      .then((updated) => {
        this.alert = updated;
        this.notificationService.success(i18n('application.alerts.update.success'));
        this.mode = AlertMode.READING;
      });
  }

  timeUnitTranslated() {
    return this.timeUnits?.find((tu) => tu?.value?.toLowerCase() === this.alert.time_unit?.toLowerCase())?.label;
  }
}
