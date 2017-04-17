import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Restangular} from "ng2-restangular";
import {Content} from "ionic-angular";
import {fakeAsync} from "@angular/core/testing";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    /**
     * 获取界面Content的实例对象
     */
    @ViewChild(Content) content: Content;

    /**
     * 已加载的文章列表
     * @type {Array}
     */
    articles: Array<IArticle> = [];

    /**
     * 一次加载多少
     * @type {number}
     */
    limit: number = 15;
    /**
     * 已经加载到了多少
     * @returns {number}
     */
    offset: number = 0;

    /**
     * 是否加载完毕
     * @type {boolean}
     */
    isOver = false;

    /**
     * 是否显示Toolbar
     * @type {boolean}
     */
    isShowToolbar = true;

    constructor(private restangular: Restangular,
                private ref: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        // this.content.scroll.addScrollListener(this.onPageScroll);
        this.load();
    }


    onScroll($event: any) {
        let scrollTop = $event.scrollTop;
        this.isShowToolbar = scrollTop < 250;
        this.ref.detectChanges();
    }

    /**
     * 加载数据
     * @returns {Promise}
     */
    load() {

        return new Promise((resolve) => {
            this.restangular.all("articles").getList({offset: this.offset, limit: this.limit})
                .subscribe((result: Array<IArticle>) => {

                    if (result.length === 0) {
                        this.isOver = true;
                    }
                    for (let article of result) {
                        this.articles.push(article);
                    }
                    this.offset += this.limit;

                    resolve();
                });
        })
    }

    /**
     * 下拉刷新
     */
    update(refresher) {
        this.offset = 0;
        this.articles = [];
        this.load().then(()=>refresher.complete());
    }

    /**
     * 查看详情
     * @param id
     */
    open(id: number) {

    }


    get slideArticles() {
        return this.articles.slice(0, 5);
    }

}


export interface IArticle {
    id?: number;
    title: string;
    content: string;
    author?: string;
    create?: Date;
    reprintedFrom?: string;
    clickCnt?: number;
    outline: string;
    titleImg?: string;
    tags?: Array<ITag>;
}

export interface ITag {
    id: number;
    name: string;
}
