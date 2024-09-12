import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PeriodicElement } from 'src/app/models/PeriodicElement';
import { EditElementDialogComponent } from 'src/app/components/edit-element-dialog/edit-element-dialog.component';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'periodic-element',
  templateUrl: './periodic-element.component.html',
  styleUrls: ['./periodic-element.component.css'],
})
export class PerioddicElementComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  public dataSource = [...ELEMENT_DATA];
  public filterControl = new FormControl('');
  
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.filterControl.valueChanges.pipe(debounceTime(2000)).subscribe(value => {
      this.applyFilter(value ?? '');
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource = ELEMENT_DATA.filter(element => 
      element.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      element.symbol.toLowerCase().includes(filterValue.toLowerCase()) ||
      element.position.toString().includes(filterValue) ||
      element.weight.toString().includes(filterValue)
    );
  }

  public openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '500px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = ELEMENT_DATA.findIndex(item => item.position === result.position);
        if (index !== -1) {
          ELEMENT_DATA[index] = result;
          this.applyFilter(this.filterControl.value ?? '');
        }
      }
    });
  }
}