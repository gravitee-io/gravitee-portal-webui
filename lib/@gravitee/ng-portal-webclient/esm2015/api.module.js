var ApiModule_1;
import * as tslib_1 from "tslib";
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from './api/analytics.service';
import { ApiService } from './api/api.service';
import { ApplicationsService } from './api/applications.service';
import { AuthenticationService } from './api/authentication.service';
import { DocumentationService } from './api/documentation.service';
import { PortalService } from './api/portal.service';
import { SubscriptionService } from './api/subscription.service';
import { UserService } from './api/user.service';
import { UsersService } from './api/users.service';
let ApiModule = ApiModule_1 = class ApiModule {
    constructor(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    static forRoot(configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    }
};
ApiModule.ctorParameters = () => [
    { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: HttpClient, decorators: [{ type: Optional }] }
];
ApiModule = ApiModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [],
        declarations: [],
        exports: [],
        providers: [
            AnalyticsService,
            ApiService,
            ApplicationsService,
            AuthenticationService,
            DocumentationService,
            PortalService,
            SubscriptionService,
            UserService,
            UsersService
        ]
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, SkipSelf()),
    tslib_1.__param(1, Optional())
], ApiModule);
export { ApiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BncmF2aXRlZS9uZy1wb3J0YWwtd2ViY2xpZW50LyIsInNvdXJjZXMiOlsiYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFpQm5ELElBQWEsU0FBUyxpQkFBdEIsTUFBYSxTQUFTO0lBUWxCLFlBQXFDLFlBQXVCLEVBQ25DLElBQWdCO1FBQ3JDLElBQUksWUFBWSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStEO2dCQUMvRSwwREFBMEQsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQWhCTSxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUF5QztRQUMzRCxPQUFPO1lBQ0gsUUFBUSxFQUFFLFdBQVM7WUFDbkIsU0FBUyxFQUFFLENBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxDQUFFO1NBQzlFLENBQUM7SUFDTixDQUFDO0NBWUosQ0FBQTs7WUFWc0QsU0FBUyx1QkFBOUMsUUFBUSxZQUFJLFFBQVE7WUFDSCxVQUFVLHVCQUEzQixRQUFROztBQVRiLFNBQVM7SUFmckIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFPLEVBQUU7UUFDaEIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxFQUFPLEVBQUU7UUFDaEIsU0FBUyxFQUFFO1lBQ1QsZ0JBQWdCO1lBQ2hCLFVBQVU7WUFDVixtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLG9CQUFvQjtZQUNwQixhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLFdBQVc7WUFDWCxZQUFZO1NBQUU7S0FDakIsQ0FBQztJQVNnQixtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ3RCLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0dBVGYsU0FBUyxDQWtCckI7U0FsQlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuXG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uc1NlcnZpY2UgfSBmcm9tICcuL2FwaS9hcHBsaWNhdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL2FwaS9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERvY3VtZW50YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZG9jdW1lbnRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcnRhbFNlcnZpY2UgfSBmcm9tICcuL2FwaS9wb3J0YWwuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25TZXJ2aWNlIH0gZnJvbSAnLi9hcGkvc3Vic2NyaXB0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL2FwaS91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlcnNTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvdXNlcnMuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6ICAgICAgW10sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6ICAgICAgW10sXG4gIHByb3ZpZGVyczogW1xuICAgIEFuYWx5dGljc1NlcnZpY2UsXG4gICAgQXBpU2VydmljZSxcbiAgICBBcHBsaWNhdGlvbnNTZXJ2aWNlLFxuICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICBEb2N1bWVudGF0aW9uU2VydmljZSxcbiAgICBQb3J0YWxTZXJ2aWNlLFxuICAgIFN1YnNjcmlwdGlvblNlcnZpY2UsXG4gICAgVXNlclNlcnZpY2UsXG4gICAgVXNlcnNTZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBpTW9kdWxlIHtcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlndXJhdGlvbkZhY3Rvcnk6ICgpID0+IENvbmZpZ3VyYXRpb24pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBcGlNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFsgeyBwcm92aWRlOiBDb25maWd1cmF0aW9uLCB1c2VGYWN0b3J5OiBjb25maWd1cmF0aW9uRmFjdG9yeSB9IF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciggQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBBcGlNb2R1bGUsXG4gICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcGlNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpbiB5b3VyIGJhc2UgQXBwTW9kdWxlIG9ubHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFodHRwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIGltcG9ydCB0aGUgSHR0cENsaWVudE1vZHVsZSBpbiB5b3VyIEFwcE1vZHVsZSEgXFxuJyArXG4gICAgICAgICAgICAnU2VlIGFsc28gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjA1NzUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==