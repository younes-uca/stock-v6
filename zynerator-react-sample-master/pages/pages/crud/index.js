import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
;
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';

import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import { FournisseurService } from '../../../demo/service/FournisseurService'


const Crud = () => {
    let emptyFournisseur = {

        nom: '',
        ice: null,
        tel: '',
        email: null,
        adresse: null,
        description: '',

    };

    const [fournisseurs, setFournisseurs] = useState(null);
    const [fournisseurDialog, setFournisseurDialog] = useState(false);
    const [deleteFournisseurDialog, setDeleteFournisseurDialog] = useState(false);
    const [deleteFournisseursDialog, setDeleteFournisseursDialog] = useState(false);
    const [fournisseur, setFournisseur] = useState(emptyFournisseur);
    const [selectedFournisseurs, setSelectedFournisseurs] = useState(null);
    const [selectedFournisseur, setSelectedFournisseur] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        FournisseurService.getFournisseurList().then(response => {
                setFournisseurs(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setFournisseur(emptyFournisseur);
        setSubmitted(false);
        setFournisseurDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setFournisseurDialog(false);
    };

    const hideDeleteFournisseurDialog = () => {
        setDeleteFournisseurDialog(false);
    };

    const hideDeleteFournisseursDialog = () => {
        setDeleteFournisseursDialog(false);
    };

    const saveFournisseur =  () => {
        setSubmitted(true);

           let _fournisseurs = [...fournisseurs];
            let _fournisseur = { ...fournisseur };

            try {
                if (_fournisseur.id) {

                    FournisseurService.putFournisseur(_fournisseur);
                    const index = findIndexById(_fournisseur.id);
                    _fournisseurs[index] = _fournisseur;
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Fournisseur Updated', life: 3000 });
                } else {

                    FournisseurService.saveFournisseur(_fournisseur);
                    _fournisseur.id = createId();
                    _fournisseurs.push(_fournisseur);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Fournisseur Created', life: 3000 });
                }

                setFournisseurs(_fournisseurs);
                setFournisseurDialog(false);
                setFournisseur(emptyFournisseur);
            } catch (error) {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to save fournisseur', life: 3000 });
            }

    };

    const editFournisseur = (fournisseur) => {

        setFournisseur({ ...fournisseur });
        setFournisseurDialog(true);
    };

    const confirmDeleteFournisseur = (fournisseur) => {
        setSelectedFournisseur(fournisseur);
        setDeleteFournisseurDialog(true);
    };

    const deleteFournisseur =  () => {

        try {
            FournisseurService.deleteFournisseur(selectedFournisseur.id);
            setDeleteFournisseurDialog(false);
            setFournisseur(emptyFournisseur);
            let _fournisseurs = fournisseurs.filter((val) => val.id !== selectedFournisseur.id);
            setFournisseurs(_fournisseurs);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Fournisseur Deleted', life: 3000 });

        } catch (error) {
            console.log(error);
        }

           };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < fournisseurs.length; i++) {
            if (fournisseurs[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteFournisseursDialog(true);
    };

    const deleteSelectedFournisseurs = () => {
        let _fournisseurs = fournisseurs.filter((val) => !selectedFournisseurs.includes(val));
        setFournisseurs(_fournisseurs);
        setDeleteFournisseursDialog(false);
        setSelectedFournisseurs(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Fournisseurs Deleted', life: 3000 });
    };



    const onInputChange = (e, nom) => {
        const val = (e.target && e.target.value) || '';
        let _fournisseur = { ...fournisseur };
        _fournisseur[`${nom}`] = val;

        setFournisseur(_fournisseur);
    };



    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedFournisseurs || !selectedFournisseurs.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const iceBodyTemplate = (rowData) => {
        return(
            <>
                <span className="p-column-title">Ice</span>
                {rowData.ice}
            </>
        );
    };

    const idBodyTemplate = (rowData) => {
        return(
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
                </>
                );
    };

    const nomBodyTemplate = (rowData) => {
        return(
            <>
                <span className="p-column-title">Nom</span>
                {rowData.nom}
            </>
        );
    };

    const telBodyTemplate = (rowData) => {
        return(
            <>
                <span className="p-column-title">Tel</span>
                {rowData.tel}
            </>
        );
    };


    const emailBodyTemplate = (rowData) => {
        return(
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };


    const descriptionBodyTemplate = (rowData) => {
        return(
            <>
                <span className="p-column-title">Description</span>
                {rowData.description}
            </>
        );
    };
    const adresseBodyTemplate = (rowData) => {
        return(
            <>
                <span className="p-column-title">Adresse</span>
                {rowData.adresse}
            </>
        );
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editFournisseur(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteFournisseur(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Fournisseurs</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const fournisseurDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveFournisseur} />
        </>
    );
    const deleteFournisseurDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteFournisseurDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteFournisseur} />
        </>
    );
    const deleteFournisseursDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteFournisseursDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedFournisseurs} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={fournisseurs}
                        selection={selectedFournisseurs}
                        onSelectionChange={(e) => setSelectedFournisseurs(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} fournisseurs"
                        globalFilter={globalFilter}
                        emptyMessage="No fournisseur found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>

                        <Column field="nom" header="Nom" sortable body={nomBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="ice" header="Ice" sortable body={iceBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="tel" header="tel" sortable body={telBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="adresse" header="Adresse" sortable body={adresseBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="description" header="Description" sortable body={descriptionBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                          <Column header="Action" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={fournisseurDialog} style={{ width: "450px" }} header="Fournisseur Details" modal className="p-fluid" footer={fournisseurDialogFooter} onHide={hideDialog}>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nom">Nom</label>
                                <InputText id="nom" value={fournisseur.nom} onChange={(e) => onInputChange(e, "nom")} required autoFocus className={classNames({ "p-invalid": submitted && !fournisseur.nom })} />
                                {submitted && !fournisseur.nom && <small className="p-invalid">Nom est obligatoire.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="ice">ICE</label>
                                <InputText id="ice" value={fournisseur.ice} onChange={(e) => onInputChange(e, "ice")} required autoFocus className={classNames({ "p-invalid": submitted && !fournisseur.ice })} />
                                {submitted && !fournisseur.ice && <small className="p-invalid">ICE est obligatoire.</small>}
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="tel">Tél</label>
                                <InputText   id="tel" value={fournisseur.tel} onChange={(e) =>onInputChange(e, "tel")} />
                            </div>
                            <div className="field col">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={fournisseur.email} onChange={(e) => onInputChange(e, "email")} integeronly />
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="adresse">Adresse</label>
                                <InputText id="adresse" value={fournisseur.adresse} onChange={(e) => onInputChange(e, "adresse")} />
                            </div>
                            <div className="field col">
                                <label htmlFor="description">Description</label>
                                <InputTextarea id="description" value={fournisseur.description} onChange={(e) => onInputChange(e, "description")} required rows={3} cols={20} />
                                {submitted && !fournisseur.description && <small className="p-invalid">Description est obligatoire.</small>}
                            </div>
                        </div>
                    </Dialog>


                    <Dialog visible={deleteFournisseurDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteFournisseurDialogFooter} onHide={hideDeleteFournisseurDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {fournisseur && (
                                <span>
                                    Are you sure you want to delete <b>{fournisseur.nom}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteFournisseursDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteFournisseursDialogFooter} onHide={hideDeleteFournisseursDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {fournisseur && <span>Are you sure you want to delete the selected fournisseurs?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};


export default Crud;
