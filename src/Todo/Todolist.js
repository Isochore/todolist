import React, { Component } from 'react';
import { Button, Input, ListGroup, ListGroupItem } from 'reactstrap';
import Swal from 'sweetalert2';

class Todolist extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            items: []
        };
    }

    readChange(event) {
        this.setState({
            userInput: event.target.value
        });
    }

    addItem(event) {
        event.preventDefault();
        const reg = /[^a-zA-Z_0-9áàâäãéèêëíìîïóòôöõúùûüýÿÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜÝ\s]/;
        if(this.state.userInput.match(reg) === null && this.state.userInput.match(/[^\s]/) !== null) {
            if(this.state.userInput !== '' && this.state.items.indexOf(this.state.userInput) === -1) {
                this.setState({
                    items: [...this.state.items, this.state.userInput],
                    userInput: ''
                })
            } else if(this.state.items.indexOf(this.state.userInput) !== -1) {
                Swal.fire({
                    type: 'error',
                    title: 'Cet objet existe déjà',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
        } else {
            Swal.fire({
                type: 'error',
                title: "L'objet contient des caratères interdits",
                text: "L'objet doit être constitué de lettres et de chiffres.",
            })
        }
    }

    deleteItem(item, identity) {
        let currentItem = document.querySelector('.' + identity);
        currentItem.classList.add('fade-out');
        setTimeout(() => {
            const arrayItems = this.state.items;
            const indexItem = arrayItems.indexOf(item);
            arrayItems.splice(indexItem, 1);
            this.setState({
                items: arrayItems
            })
        }, 500);
    }

    deleteAll(event) {
        event.preventDefault();
        if(this.state.items.length > 0) {
            Swal.fire({
                title: 'Êtes vous sûr(e) ?',
                text: "Tous les objets de la liste seront définitivement supprimés.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Annuler',
                confirmButtonText: 'Confirmer'
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        type: 'success',
                        title: 'Liste supprimée',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    this.setState({
                        items: []
                    })
                }
            })
        }
    }

    renderItems() {
        return this.state.items.map((item) => {
            let identity = 'item-' + item;
            return(
                <ListGroupItem className={identity + ' fade-in'} key={item}>{item}<Button close onClick={this.deleteItem.bind(this, item, identity)} /></ListGroupItem>
            );
        });
    }

    render() {
        return(
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center mb-5">Ma liste de courses</h1>
                <form className="d-flex">
                    <Input value={this.state.userInput} type="text" placeholder="Ex: bananes, lait..." onChange={this.readChange.bind(this)} />
                    <button className="btn btn-dark" onClick={this.addItem.bind(this)}>Ajouter</button>
                    <button className="btn btn-danger" onClick={this.deleteAll.bind(this)}><i className="far fa-trash-alt"></i></button>
                </form>
                <div className="list">
                    <ListGroup>
                        {this.renderItems()}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default Todolist;