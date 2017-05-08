import {Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ListDataProvider {

    private _dataMap = {};

    constructor() {

    }

    /**
     *
     * @param key
     * @returns {ListDataService | null}
     */
    get(key: string): ListDataService | null {
        if (this._dataMap[key] != null) {
            return this._dataMap[key];
        }
        return null;
    }

    create(key: string, restangular: Restangular): ListDataService {
        return this._dataMap[key] = new ListDataService(restangular);
    }
}


export class ListDataService {


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


    constructor(private restangular: Restangular) {
    }


    /**
     * 加载数据
     * @returns {Promise}
     */
    load(): Observable<Array<IArticle>> {
        let ob = this.restangular.getList({offset: this.offset, limit: this.limit})
        ob.subscribe((result: Array<IArticle>) => {
            if (result.length === 0) {
                this.isOver = true;
            }
            // this.articles.concat(result);
            for (let article of result) {
                this.articles.push(article);
            }
            this.offset += this.limit;
        });
        return ob;
    }

    /**
     * 下拉刷新
     */
    update(): Observable<Array<IArticle>> {
        this.offset = 0;
        let ob = this.restangular.getList({offset: this.offset, limit: this.limit});
        ob.subscribe((result: Array<IArticle>) => {
            console.log(result);
            this.articles.splice(0, this.articles.length);
            // this.articles.concat(result);
            for (let article of result) {
                this.articles.push(article);
            }
            console.log(this.articles);
            this.isOver = false;
            this.offset += this.limit;
        });
        return ob;
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
