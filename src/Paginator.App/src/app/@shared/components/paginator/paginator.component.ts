import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Inject, Input, NgModule, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  coerceNumberProperty,
} from '@angular/cdk/coercion';
import { MatPaginatorDefaultOptions, MatPaginatorIntl, MAT_PAGINATOR_DEFAULT_OPTIONS, PageEvent, _MatPaginatorBase } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PageSizeOptionsModule } from '../page-size-options';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent extends _MatPaginatorBase<MatPaginatorDefaultOptions> implements OnInit, AfterContentChecked {

  _startIndex = 1;
  _maxNumberOfPagesInPager = 5;
  afterContentChecked$: Subject<boolean> = new Subject();
  page$: BehaviorSubject<number> = new BehaviorSubject(1);
  pageSizeChanged$: BehaviorSubject<void> = new BehaviorSubject(null);

  readonly vm$ = combineLatest([
    this.afterContentChecked$,
    this.page$.pipe(
      map(page => {
        const pageCount = Math.ceil(this.length / this.pageSize);
        let maxNumberOfPagesInPager = pageCount > 0 && pageCount > this._maxNumberOfPagesInPager ? this._maxNumberOfPagesInPager : pageCount;
        let pages = [];
        for(let i = this._startIndex; i<= this._startIndex + maxNumberOfPagesInPager - 1; i++) {
          pages.push(i)
        }

        if(pages[pages.length - 1] == page && pageCount > page) {
          this._startIndex = this._startIndex + 1;
        }
        else if(pages[0] == page && page != 1) {
          this._startIndex = this._startIndex - 1;
        }
        return true;
      })
    )
  ])
  .pipe(
    map(_ => {
      const pageCount = Math.ceil(this.length / this.pageSize);
      let maxNumberOfPagesInPager = pageCount > 0 && pageCount > this._maxNumberOfPagesInPager ? this._maxNumberOfPagesInPager : pageCount;
      let pages = [];
      for(let i = this._startIndex; i<= this._startIndex + maxNumberOfPagesInPager - 1; i++) {
        pages.push(i)
      }
      return {
        pages
      }
    })
  );
  constructor(
    intl: MatPaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS) defaults?: MatPaginatorDefaultOptions,
  ) {
    super(intl, changeDetectorRef, defaults);

    this.initialized
    .pipe(
      tap(_ => this.length)
    )
    .subscribe();
  }

  ngAfterContentChecked(): void {
    console.log(this.length);
    this.afterContentChecked$.next(true);
  }


  @Output() page: EventEmitter<PageEvent> = new EventEmitter();

  handleNextPage() {
    if (!this.hasNextPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.pageIndex + 1;
    this.page$.next(this.pageIndex + 1);
    this.emitPageEvent(previousPageIndex);
  }

  handlePreviousPage() {
    if (!this.hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.pageIndex - 1;
    this.page$.next(this.pageIndex);
    this.emitPageEvent(previousPageIndex);
  }


  handlePageClick(page:string | number) {
    page = coerceNumberProperty(page)
    const previousPageIndex = this.pageIndex;
    const pageIndex = coerceNumberProperty(page) - 1;
    this.pageIndex = pageIndex;
    this.page$.next(page);
    this.emitPageEvent(previousPageIndex);
  }


  private emitPageEvent(previousPageIndex: number) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }

  changePageSize(pageSize: any) {
    super._changePageSize(coerceNumberProperty(pageSize));
    this._startIndex = 1;
    this.page$.next(this.pageIndex + 1);
  }
}

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  exports: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    PageSizeOptionsModule
  ]
})
export class PaginatorModule { }
