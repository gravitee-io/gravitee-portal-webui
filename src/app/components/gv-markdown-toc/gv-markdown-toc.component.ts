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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as marked from 'marked';
import { PageService } from 'src/app/services/page.service';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-gv-markdown-toc',
  templateUrl: './gv-markdown-toc.component.html',
  styleUrls: ['./gv-markdown-toc.component.css']
})
export class GvMarkdownTocComponent implements OnInit, OnDestroy {

  tocList: TocModel[];
  currentAnchor: string;
  pageServiceSubscription: Subscription;

  /* for TOC computiung */
  parser = new marked.Parser();
  slugger = new marked.Slugger();
  textRenderer = new marked.TextRenderer();
  /* ****************** */
  private scrollInProgress: boolean;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router,
    private scrollService: ScrollService,
  ) {
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(anchor => {
      if (!this.scrollInProgress) {
        this.currentAnchor = anchor;
      }
    });
    this.pageServiceSubscription = this.pageService.get().subscribe(page => {
      if (page && page.content) {
        this.tocList = this._buildTocModel(page.content);
      }
    });
  }

  ngOnDestroy(): void {
    this.pageServiceSubscription.unsubscribe();
  }

  goTo(anchor: string) {
    this.scrollInProgress = true;
    this.currentAnchor = anchor;
    this.scrollService.scrollToAnchor(anchor).then(() => {
      this.scrollInProgress = false;
    });
  }

  _buildTocModel(content: string): TocModel[] {
    const currentNodeByLevel = {};
    const nodeMap = [];

    const tokens = marked.lexer(content);
    tokens
      .filter((item) => item.type === 'heading' && item.depth > 1)
      .forEach((item: any) => {
        const currentNode: TocModel = {
          anchor: this._computeAnchor(item),
          text: this._computeText(item),
          children: []
        };
        currentNodeByLevel[item.depth] = currentNode;
        const parentNode = currentNodeByLevel[item.depth - 1];
        if (parentNode) {
          parentNode.children.push(currentNode);
        } else {
          nodeMap.push(currentNode);
        }
      });
    return nodeMap;
  }

  _computeText(item: any) {
    return this.parser.parseInline(item.tokens, this.textRenderer);
  }

  _computeAnchor(item: any) {
    return this.slugger.slug(this._unescape(this.parser.parseInline(item.tokens, this.textRenderer)));
  }


  _unescape(html) {
    const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

    // explicitly match decimal, hex, and named HTML entities
    return html.replace(unescapeTest, (_, n) => {
      n = n.toLowerCase();
      if (n === 'colon') {
        return ':';
      }
      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x'
          ? String.fromCharCode(parseInt(n.substring(2), 16))
          : String.fromCharCode(+n.substring(1));
      }
      return '';
    });
  }

}

class TocModel {
  public anchor: string;
  public text: string;
  public children?: TocModel[];
}
