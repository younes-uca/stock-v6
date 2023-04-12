package  ma.sir.easystock.ws.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ma.sir.easystock.zynerator.util.ListUtil;

import ma.sir.easystock.bean.core.Abonne;

import ma.sir.easystock.zynerator.util.StringUtil;
import ma.sir.easystock.zynerator.converter.AbstractConverter;
import ma.sir.easystock.zynerator.util.DateUtil;
import ma.sir.easystock.bean.history.StoreHistory;
import ma.sir.easystock.bean.core.Store;
import ma.sir.easystock.ws.dto.StoreDto;

@Component
public class StoreConverter extends AbstractConverter<Store, StoreDto, StoreHistory> {

    @Autowired
    private AbonneConverter abonneConverter ;
    @Autowired
    private MagasinConverter magasinConverter ;
    private boolean abonne;
    private boolean magasins;

    public  StoreConverter(){
        super(Store.class, StoreDto.class, StoreHistory.class);
        init(true);
    }

    @Override
    public Store toItem(StoreDto dto) {
        if (dto == null) {
            return null;
        } else {
        Store item = new Store();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(StringUtil.isNotEmpty(dto.getLibelle()))
                item.setLibelle(dto.getLibelle());
            if(StringUtil.isNotEmpty(dto.getReference()))
                item.setReference(dto.getReference());
            if(dto.getAbonne() != null && dto.getAbonne().getId() != null){
                item.setAbonne(new Abonne());
                item.getAbonne().setId(dto.getAbonne().getId());
            }


            if(this.magasins && ListUtil.isNotEmpty(dto.getMagasins()))
                item.setMagasins(magasinConverter.toItem(dto.getMagasins()));

        return item;
        }
    }

    @Override
    public StoreDto toDto(Store item) {
        if (item == null) {
            return null;
        } else {
            StoreDto dto = new StoreDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
            if(StringUtil.isNotEmpty(item.getLibelle()))
                dto.setLibelle(item.getLibelle());
            if(StringUtil.isNotEmpty(item.getReference()))
                dto.setReference(item.getReference());
        if(this.abonne && item.getAbonne()!=null) {
            dto.setAbonne(abonneConverter.toDto(item.getAbonne())) ;
        }
        if(this.magasins && ListUtil.isNotEmpty(item.getMagasins())){
            magasinConverter.init(true);
            magasinConverter.setStore(false);
            dto.setMagasins(magasinConverter.toDto(item.getMagasins()));
            magasinConverter.setStore(true);

        }


        return dto;
        }
    }

    public void initList(boolean value) {
        this.magasins = value;
    }

    public void initObject(boolean value) {
        this.abonne = value;
    }


    public AbonneConverter getAbonneConverter(){
        return this.abonneConverter;
    }
    public void setAbonneConverter(AbonneConverter abonneConverter ){
        this.abonneConverter = abonneConverter;
    }
    public MagasinConverter getMagasinConverter(){
        return this.magasinConverter;
    }
    public void setMagasinConverter(MagasinConverter magasinConverter ){
        this.magasinConverter = magasinConverter;
    }
    public boolean  isAbonne(){
        return this.abonne;
    }
    public void  setAbonne(boolean abonne){
        this.abonne = abonne;
    }
    public boolean  isMagasins(){
        return this.magasins ;
    }
    public void  setMagasins(boolean magasins ){
        this.magasins  = magasins ;
    }
}
