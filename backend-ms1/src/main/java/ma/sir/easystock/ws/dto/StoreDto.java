package  ma.sir.easystock.ws.dto;

import ma.sir.easystock.zynerator.audit.Log;
import ma.sir.easystock.zynerator.dto.AuditBaseDto;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class StoreDto  extends AuditBaseDto {

    private String libelle  ;
    private String reference  ;

    private AbonneDto abonne ;

    private List<MagasinDto> magasins ;


    public StoreDto(){
        super();
    }



    @Log
    public String getLibelle(){
        return this.libelle;
    }
    public void setLibelle(String libelle){
        this.libelle = libelle;
    }

    @Log
    public String getReference(){
        return this.reference;
    }
    public void setReference(String reference){
        this.reference = reference;
    }


    public AbonneDto getAbonne(){
        return this.abonne;
    }

    public void setAbonne(AbonneDto abonne){
        this.abonne = abonne;
    }



    public List<MagasinDto> getMagasins(){
        return this.magasins;
    }

    public void setMagasins(List<MagasinDto> magasins){
        this.magasins = magasins;
    }

}
