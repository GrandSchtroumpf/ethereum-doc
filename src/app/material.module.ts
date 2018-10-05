import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    FlexLayoutModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    FlexLayoutModule
  ]
})
export class MaterialModule { }
