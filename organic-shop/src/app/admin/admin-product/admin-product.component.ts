import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { RouterLinkRendererComponent } from '../../shared/router-link-renderer/router-link-renderer.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  paginationPageSize: number=0;
  rowData=[];
  columnDefs: any;
  defaultColDef: any;
  productList: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {
    this.columnDefs=[
      { headerName: "", field: "id", width: 100, cellStyle: { textAlign: 'center' } },
      { headerName: "Title", field: "title", width: 400 },
      { headerName: "Price", field: "price", width: 200 },
      { headerName: "", field: "action", width: 400, cellRenderer: "routerLinkRenderer" }
    ];
    this.frameworkComponents= {
      routerLinkRenderer: RouterLinkRendererComponent
    }
    this.defaultColDef= { resizable: true, sortable: true };
    this.paginationPageSize= 10;
  }

  ngOnInit(): void {
  }
  createNew(){
    this.router.navigateByUrl("admin/products/new");
  } 

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.productService.getAllProducts()
        .subscribe(data => {
          this.productList= data;
          this.gridApi.setRowData(this.prepareGridData(data))
    });
  }
  prepareGridData(products: Product[]): any[] {
    let index: number = 0;
    return products.map(d => {
      index++;
      return { 
        id: index, 
        title: d.title, 
        price: d.price,
        action: d.key
      }
    })
  }
  getRowHeight(params: any){
    return 40;
  }
  onPageSizeChange(){
    this.gridApi.paginationSetPageSize(this.paginationPageSize);
  }
  onKeyEnter(val?: string){
    let filteredProductList= val != "" && val !== undefined 
        ? this.productList.filter(p => p.title?.toLocaleLowerCase().startsWith(val.toLocaleLowerCase())): this.productList;
    this.gridApi.setRowData(this.prepareGridData(filteredProductList));
  }
}
