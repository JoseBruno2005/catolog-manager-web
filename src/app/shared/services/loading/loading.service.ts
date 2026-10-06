import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loaderId = 'global-app-loader';

    show(){
        if(document.getElementById(this.loaderId)) return;

        const overlay = document.createElement('div');
        overlay.id = this.loaderId;
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '9999';

        const spinner = document.createElement('i');
        spinner.className = 'pi pi-spin pi-spinner';
        spinner.style.fontSize = '3rem';
        spinner.style.color = '#fff';

        overlay.appendChild(spinner);
        document.body.appendChild(overlay);
    }

    hide(){
        const overlay = document.getElementById(this.loaderId);
        if(overlay){
            overlay.remove();
        }
    }
}