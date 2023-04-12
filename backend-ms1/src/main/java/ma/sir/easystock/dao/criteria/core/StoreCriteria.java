package  ma.sir.easystock.dao.criteria.core;


import ma.sir.easystock.zynerator.criteria.BaseCriteria;
import java.util.List;

public class StoreCriteria extends  BaseCriteria  {

    private String libelle;
    private String libelleLike;
    private String reference;
    private String referenceLike;

    private AbonneCriteria abonne ;
    private List<AbonneCriteria> abonnes ;


    public StoreCriteria(){}

    public String getLibelle(){
        return this.libelle;
    }
    public void setLibelle(String libelle){
        this.libelle = libelle;
    }
    public String getLibelleLike(){
        return this.libelleLike;
    }
    public void setLibelleLike(String libelleLike){
        this.libelleLike = libelleLike;
    }

    public String getReference(){
        return this.reference;
    }
    public void setReference(String reference){
        this.reference = reference;
    }
    public String getReferenceLike(){
        return this.referenceLike;
    }
    public void setReferenceLike(String referenceLike){
        this.referenceLike = referenceLike;
    }


    public AbonneCriteria getAbonne(){
        return this.abonne;
    }

    public void setAbonne(AbonneCriteria abonne){
        this.abonne = abonne;
    }
    public List<AbonneCriteria> getAbonnes(){
        return this.abonnes;
    }

    public void setAbonnes(List<AbonneCriteria> abonnes){
        this.abonnes = abonnes;
    }
}
