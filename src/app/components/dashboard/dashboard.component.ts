import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as shell from "shelljs"
import * as exec from 'shelljs.exec'
import {NgForm} from "@angular/forms";
import {Commande} from "../../utils/Commande";
import {LocalStorageService} from "../../providers/localStorage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  file:any;
  removeFile:any;
  dossier:any;
  name:any;

  constructor(private router:Router,
              private localStorage:LocalStorageService) { }

  ngOnInit() {
    document.body.style.overflow = "visible";
    this.name = this.localStorage.getLocalstorage('nom');
  }

  home() {
    this.router.navigate(['']);
  }

  logout(){
    exec('logout');
  }

  /**
   * Création fichiers
   * @param form
   */
  create(form:NgForm){
    shell.touch(this.file);
    form.reset();
  }

  /**
   * Suppressio fichier
   * @param form
   */
  fafao(form:NgForm){
    exec('rm -rf ' + this.removeFile, {silent: true});
    form.reset();
  }

  /**
   * Mamorona dossier
   */
  mamorona(form:NgForm){
    // exec('mkdir' + this.dossier);
    shell.mkdir('-p',this.dossier);
    form.reset();
  }

  startApache(){
    exec(Commande.apache, {silent: true});
  }

  startStorm(){
    exec(Commande.phpstorm, {silent: true});
  }

  startChrome(){
    exec(Commande.chrome, {silent: true});
    // const  { stdout, stderr, code } = exec(Commande.chrome, {silent: true});
    // let jul_commad_return = { stdout, stderr, code };
    // if ( jul_commad_return.code === 0) {
    //   window.alert("Mazotoa");
    // }else {
    //   window.alert("an error occured");
    // }
    // return jul_commad_return;
  }

  systReboot(){
    exec(Commande.mamelona_indray, {silent:true});
  }

  systShutdown(){
    exec(Commande.mamono,{silent:true});
  }

  startAll(){
    this.startChrome();
    this.startApache();
    this.startStorm();
  }
}
