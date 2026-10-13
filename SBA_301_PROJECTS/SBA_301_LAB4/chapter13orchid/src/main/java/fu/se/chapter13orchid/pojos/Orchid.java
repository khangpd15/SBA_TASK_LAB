package fu.se.chapter13orchid.pojos;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "orchid")
public class Orchid implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    @JsonProperty("orchidID")
    private int orchidID;

    @Column(name = "orchid_name")
    @JsonProperty("orchidName")
    private String orchidName;

    @Column(name = "is_natural", columnDefinition = "bit default 0")
    @JsonProperty("natural")
    @JsonAlias({"isNatural", "natural"})
    private boolean isNatural;

    @Column(name = "orchid_description")
    @JsonProperty("orchidDescription")
    private String orchidDescription;

    @Column(name = "orchid_category")
    @JsonProperty("orchidCategory")
    private String orchidCategory;

    @Column(name = "is_attractive", columnDefinition = "bit default 0")
    @JsonProperty("attractive")
    @JsonAlias({"isAttractive", "attractive"})
    private boolean isAttractive;

    @Column(name = "orchid_url")
    @JsonProperty("orchidURL")
    private String orchidURL;

    public Orchid() {
    }

    public Orchid(int orchidID, String orchidName, boolean isNatural, String orchidDescription, String orchidCategory, boolean isAttractive, String orchidURL) {
        this.orchidID = orchidID;
        this.orchidName = orchidName;
        this.isNatural = isNatural;
        this.orchidDescription = orchidDescription;
        this.orchidCategory = orchidCategory;
        this.isAttractive = isAttractive;
        this.orchidURL = orchidURL;
    }

    public int getOrchidID() {
        return orchidID;
    }

    public void setOrchidID(int orchidID) {
        this.orchidID = orchidID;
    }

    public String getOrchidName() {
        return orchidName;
    }

    public void setOrchidName(String orchidName) {
        this.orchidName = orchidName;
    }

    public boolean isNatural() {
        return isNatural;
    }

    public void setNatural(boolean isNatural) {
        this.isNatural = isNatural;
    }

    public String getOrchidDescription() {
        return orchidDescription;
    }

    public void setOrchidDescription(String orchidDescription) {
        this.orchidDescription = orchidDescription;
    }

    public String getOrchidCategory() {
        return orchidCategory;
    }

    public void setOrchidCategory(String orchidCategory) {
        this.orchidCategory = orchidCategory;
    }

    public boolean isAttractive() {
        return isAttractive;
    }

    public void setAttractive(boolean isAttractive) {
        this.isAttractive = isAttractive;
    }

    public String getOrchidURL() {
        return orchidURL;
    }

    public void setOrchidURL(String orchidURL) {
        this.orchidURL = orchidURL;
    }

    @Override
    public String toString() {
        return "Orchid{" +
                "orchidID=" + orchidID +
                ", orchidName='" + orchidName + '\'' +
                ", isNatural=" + isNatural +
                ", orchidDescription='" + orchidDescription + '\'' +
                ", orchidCategory='" + orchidCategory + '\'' +
                ", isAttractive=" + isAttractive +
                ", orchidURL='" + orchidURL + '\'' +
                '}';
    }
}
