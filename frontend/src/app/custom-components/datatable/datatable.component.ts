import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTable } from "@angular/material";
import { DataSource } from '@angular/cdk/table';
import { StringMapWithRename } from '@angular/core/src/render3/jit/compiler_facade_interface';

@Component({
    selector: "app-datatable",
    templateUrl: "./datatable.component.html",
    styleUrls: ["./datatable.component.scss"]
})
export class DatatableComponent implements OnInit, OnChanges {
    _dataSource: MatTableDataSource<any>;
    _displayedColumns: string[];
    columnsToDisplay: string[];
    @ViewChild(MatTable) table: MatTable<any>;

    constructor() {}

    ngOnInit() {
        this.dataSource = <any>[];
        this.columnsToDisplay = this.displayedColumns.slice();
    }

    @Input()
    set dataSource(source: MatTableDataSource<any>) {
        this._dataSource = source;
    }

    get dataSource(): MatTableDataSource<any> {
        return this._dataSource;
    }

    @Input()
    set displayedColumns(columns: string[]) {
        this._displayedColumns = columns;
    }

    get displayedColumns() : string[] {
        return this._displayedColumns;
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let change = changes[propName];
            console.log(JSON.stringify(change))
            if (propName == 'dataSource') {
                this.dataSource = change.currentValue;
            } else if (propName == 'displayedColumns') {
                this.displayedColumns = change.currentValue;
            }
        }
        if (this.table !== undefined) {
            this.table.renderRows();
        }
    }
}
