import {Component} from '@angular/core';
import {Restangular} from "ng2-restangular/dist/esm/src";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private restangular: Restangular) {
    this.load();
  }


  /**
   * 已加载的文章列表
   * @type {Array}
   */
  articles: Array<IArticle> = [];

  /**
   * 一次加载多少
   * @type {number}
   */
  limit: number = 10;
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
   * 加载数据
   * @returns {Promise<T>}
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
  update() {

  }

  /**
   * 查看详情
   * @param id
   */
  open(id: number) {

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
