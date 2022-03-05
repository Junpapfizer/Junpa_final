import React, {Component, useState} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";


export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            idkey:"",
            firstname:"",
            lastname:"",
            lula:"", // ตัวแปรที่ใช้เชื่อมม
            labtop_array:[] // ผักกาศตัวแปร
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            
            idkey:this.state.idkey,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:JSON.parse(localStorage.getItem('user')).email, //path data email
            lula:this.state.lula, // ตัวแปรที่ใช้เชื่อมม
           
        }
        console.log(data)
        axios.post(url,data)
        this.setState({
            idkey:"",
            firstname:"",
            lastname:"",
            lula:"", // ตัวแปรที่ใช้เชื่อมม
        });
    }
    //labtop
    componentDidMount() {
         console.log("before get data");
         this.getData();
         console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/labtop')//name in data base
            .then(res => res.json())
            .then(list => this.setState({ labtop_array:list }))
        console.log("after fetch data");
    }
        
    render() {
        return(
            <div>
                <div className="App">
                <h2 className="my-4">Register<br/></h2>
                    <hr/>
                </div>
                <form className="container">
               
                    <div className="form-group">
                        <label className="text-white" >First Name</label>
                        <input type="text" className="form-control" id="firstname" onChange={this.handleChang} value={this.state.firstname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Last Name</label>
                        <input type="text" className="form-control" id="lastname" onChange={this.handleChang} value={this.state.lastname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  htmlFor="id">ID</label>
                        <input type="text" className="form-control" size="10" id="idkey" onChange={this.handleChang} value={this.state.idkey}/>
                    </div>
                    <div>
                    <label className="text-white"  >LAPTOP</label>
                    <select className="form-control" id="lula" onChange={this.handleChang} value={this.state.lula} required> 
                            <option>Select labtop </option>
                            {this.state.labtop_array.map(labtop => {
                                return <option value={labtop.laptop_id}>{labtop.laptop_Name}</option>
                            })}
                        </select>
                    </div>
                    <a href="/Showdata">
                    <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                    </a>
                   
                </form>
            </div>
        );
    }
}
