import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from '../file-upload.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

	
	// Variable to store shortLink from api response
	shortLink: string = "";
	loading: boolean = false; // Flag variable
	file?: File ; // Variable to store file

	// Inject service
	constructor(private fileUploadService: FileUploadService, private router: Router) { }

	ngOnInit(): void {
	}

	// On file Select
	onChange(event:any) {
		this.file = event.target.files[0];
	}

	// OnClick of button Upload
	onUpload() {
		this.loading = !this.loading;
		// console.log(this.file);
		if(this.file){

			this.fileUploadService.upload(this.file).subscribe(
				(event: any) => {
					this.router.navigate(['/barChartVertical']);
					if (typeof (event) === 'object') {
	
						// Short link via api response
						this.shortLink = event.link;
	
						this.loading = false; // Flag variable
						this.router.navigate(['/barChartVertical']);
					}
				}
			);
		}
	}
}
