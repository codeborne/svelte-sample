import type {Address} from 'src/api/types'
import {CountryCode} from 'src/api/types'

const basePath = `https://inaadress.maaamet.ee/inaadress/gazetteer?`

type EstonianAddressSearchRequest = AddressSearch | AddressById | ApartmentsByOid | ObjectSearch | CoordinateSearch

/**
 * documentation:
 * https:// inaadress.maaamet.ee/inaadress/js/pdf/et/in_aadress_developer_manual.pdf
 * https:// inaadress.maaamet.ee/inaadress/js/pdf/en/in_aadress_developer_manual.pdf
 *
 * ADS - address data system (aadressiandmete süsteem)
 * KNR - Estonian place name book (Eesti kohanimeraamat)
 * EHAK - Estonian Administrative and population distribution Classification (Eesti haldus- ja asustusjaotuse klassifikaator)
 * EHR - Building register (Ehitusregister)
 */
export interface AddressSearch extends EstonianAddressSearchParameters {
  /**
   * Address text to be searched. Compulsory, except when x and y or adsoid parameter have values.
   * The value can be a searchable address text, cadastral number, EHR code or ADS OID
   */
  address: string
}

export interface AddressById extends EstonianAddressSearchParameters {
  /**
   * Unique technical identifier
   */
  adrid: string
}

export interface ObjectSearch extends EstonianAddressSearchParameters {
  /**
   * adsoid List of values of address object identifier (throughout versions) to be searched, separated by commas.
   * Is not compulsory when x and y or address parameters have values.
   */
  adsoid: string[]
}

export interface ApartmentsByOid extends EstonianAddressSearchParameters {
  /**
   * The adsoid value of the building whose parts of the building you want to find
   */
  hooneoid: string
}

export interface CoordinateSearch extends EstonianAddressSearchParameters {
  /**
   * L-EST X coordinate (6 decimal places) according to which addresses are searched.
   */
  x: string
  /**
   * L-EST Y coordinate (7 decimal places) according to which addresses are searched
   */
  y: string
  /**
   * When given the value of 1, it enables to find the nearest address to the given coordinates.
   */
  nearest?: boolean
  /**
   * Search circle radius in meters
   */
  radius?: string
}

export enum Features {
  EHAK = 'EHAK',
  VAIKEKOHT = 'VAIKEKOHT',
  KATASTRIYKSUS = 'KATASTRIYKSUS',
  TANAV = 'TANAV',
  EHITISHOONE = 'EHITISHOONE'
}

export enum ApartmentSearch {
  DO_NOT_SEARCH,
  SEARCH,
  SEARCH_WITHOUT_BUILDING_DATA
}


export interface EstonianAddressSearchParameters {
  /**
   * features Object types from which are searched (separated by a comma).
   * With no value the search is address-based, not objectbased.
   * The parameter can be used with both the address parameter and the LEST x (6 decimal places) and y (7 decimal places) coordinate queries.
   * Possible valules: EHAK, VAIKEKOHT, KATASTRIYKSUS, TANAV ja EHITISHOONE
   */
  features?: Features[]
  /**
   * When value is 1, only objects with uniqueness requirement are returned.
   */
  unik?: boolean
  /**
   Are you also looking for apartments?
   Possible values:
   0 - not searched,
   1 - apartments are searched,
   2 - apartments are searched and the result is apartment data without building data (default option)
   */
  appartment?: ApartmentSearch
  /**
   * Maximum number of results. Highest possible value is 100, default value 10.
   * The parameter is not considered when value is set to parameters x and y.
   */
  results?: number
  /**
   * Ehak filter
   */
  ehak?: string
  /**
   * Weather to search from historic addresses.
   * Value is year number (eg 1993) from which addresses are searched.
   * By default, if no parameter value are given, all historic addresses are included in search.
   * If value is 0, then historic addresses are excluded.
   */
  ihist?: string
  /**
   * When value is 1, also object geometry is returned. In JSON service the format is GeoJSON and in XML service GML 3.2.
   */
  geometry?: string
  /**
   * whether to use the History / POI / MA area help (value 1 or no parameter) or not (value 0) in the address search.
   * 0 does not search for recent or prehistoric history and does not take the parameter into account.
   * If the poi parameter is 1, then help = 1 will only use history and MA area help.
   * However, if the name part or alias of the POI is also included in the found address text,
   * it may be indicated that the address was found using the POI.
   */
  help?: boolean
  /**
   * poi a value of 1 displays POIs in a separate group and is not used to search for help in POI blocks.
   * If the name part or alias of the POI is also included in the found address text, the found object is displayed in the address block.
   */
  poi?: boolean
  /**
   * a value of 1 displays KNR objects in a separate group
   */
  knr?: boolean
  /**
   * type the value is the type of KOHU object (comma-separated as many)
   * that applies to all KOHU objects together with the poi and knr parameters.
   * Possible values are 10, 11, 12, 13, 14, 15 and 16
   */
  type?: number[]
  /**
   * If the value of the knr parameter is 1, then for the value of this parameter only settlements, quarters,
   * small islands and partial estates are returned from the KNR objects
   */
  maPiirkond?: string
  /**
   * a value of 1 also ensures that words with accented letters are found
   */
  iTappAsendus?: boolean
  /**
   * seos in the case of a value of 1, all the data of the buildings related to the found cadastral unit
   * or the data of the cadastral unit related to the found building shall also be returned.
   * If the value of the appartment parameter is 1 or 2,
   * the data of the parts of the building related to the building are also returned.
   */
  seos?: string
  /**
   * if the value is 1, the object relationships in ÄR and KR are also returned
   */
  seosreg?: boolean
  /**
   * for a value of 1, additional data for the EHR building is added to the response
   */
  ehr1?: string
  /**
   * for a value of 1, the data for the EHR building part is added to the response no
   */
  ehr2?: string
  /**
   * a value of 0 does not search the technical addresses. If there is no value, technical addresses are also searched no
   */
  tech?: boolean
  /**
   * ky a value of 1 is also searched among cadastral units without a cadastral link
   * (cadastre units entered by the municipality in ADS, which are not yet registered in the cadastre) no
   */
  ky?: boolean
}

export interface EstonianAddressSearchResponse {
  addresses: EstonianAddress[]
  appartments: EstonianAddressApartment[]
  error: ResponseError | string
  host: string
}

enum ResponseError {
  LYHITXT = 'LYHITXT', // After removing the invalid characters, there was not enough input left to search for anything.
  LYHITXT2 = 'LYHITXT2', // After removing the inappropriate words, there was not enough input left to search for anything.
  LYHITXT3 = 'LYHITXT3', // There were not enough input left to search for anything that was removed after a failed search.
  EIEESTI = 'EIEESTI', // The coordinates entered in to the search are outside the borders of Estonia
  LIIGAYLDINE = 'LIIGAYLDINE', // Query too general - please specify a query
  EIEHAK = 'EIEHAK', // The EHAK filter you entered in your search does not match.
  LYHIADSOID = 'LYHIADSOID', // The ADS_OID you entered in your search is too short to search.
  PIKKADSOID = 'PIKKADSOID', // The ADS_OID you entered in your search is too short to search.
  LYHITUNNUS = 'LYHITUNNUS', // The ID you entered in to the search is too short to search.
  LYHIADRID = 'LYHIADRID', // The ADR_ID you entered in to the search is too short to search.
  LYHIADOBID = 'LYHIADOBID', // The ADOB_ID you entered in to the search is too short to search.
  LYHIKYTUNNUS = 'LYHIKYTUNNUS', // The cadastral ID entered in to the search is too short to search.
  EILIIK = 'EILIIK', // Request type constraint not applicable - please specify a request.
  DBERROR = 'DBERROR', // An unexpected database error occurred. A more detailed explanation was written in the log file, please report the error to the support at inads.abi@maaamet.ee with a description of the activities before the error occurred and the date and time when the error occurred.
  error_500 = 'error_500', // An unexpected database error occurred. A more detailed explanation was written in the log file, please report the error to the support at inads.abi@maaamet.ee with a description of the activities before the error occurred and the date and time when the error occurred.
}

export interface PoiDetail {
  andmeallikas: string // The data source from which the poi data originated
  andmeseis_kp: string // As of the date the data was inherited
  avalik_alias: string // POI public alias name
  avalik_nimi: string // POI public name
  esindusaadress: string // POI representative address
  leiu_alus: string // A value of 1 was found for the search string
  poi_id: string // POI identifier in the register of origin
  tyyp: string // Type code value
  tyyp_alamgrupp: string // The name of the subgroup, which further explains the nature of the POI
  tyyp_grupp: string // Name of the group
  tyyp_nimi: string // Type name in text form
  tyyp_ylemgrupp: string // Type group code
  vid: string // Identity in the register of origin
  viitepunkt_b: string // POI geographical coordinate of the reference point -latitude
  viitepunkt_l: string // POI geographical coordinate of the reference point - east longitude
  viitepunkt_x: string // POI the 6-digit mathematical L-EST x-coordinate of the reference   point corresponds to the geographical ycoordinate
  viitepunkt_y: string // POI the 7-digit mathematical L-EST y-coordinate of the reference point corresponds to the geographical xcoordinate
  tehniline: string // 1 if it's a technical address
  kvaliteet: string // The identifier by which the given object was found in the response. Possible values are described in chapter 7.2.16
}

export interface EstonianAddress {
  aadress: string // Full address of object
  pikkaadress: string // Normalized full address found on the basis of the input search text
  taisaadress: string // Optimized full address of the address object. In case of parallel addresses, the addresses are separated by double slash. Otherwise, the content is identical to the data field pikkaadress.
  ipikkaadress: string // Full address of object in reversed order
  aadresstekst: string // Normalized proximate address
  old_aadresstekst: string // Invalid proximate address of address object
  leitud_osa: string
  unik: string // (value 0 or 1) Object with the uniqueness requirement.
  onkort: string // Does the address object have apartments (i.e. whether building contains parts of building).
  liik: string // Address object’s gazetteer type (1, 2, B, 4, E)
  liikVal: string // Name of address object’s gazetteer type (EHAK, TANAV, VAIKEKOHT, KATASTRIYKSUS, EHITISHOONE)
  tunnus: string // Address object’s id in original register.
  ads_oid: string // Value of address object identifier (throughout all versions)
  adr_id: string // Unique key of address – identifier of address verson.
  adob_id: string // Version id of address object in ADS.
  ehakmk: string // Code of county
  maakond: string // Name of county
  ehakov: string // Code of local government
  omavalitsus: string // Name of local government
  ehak: string // Code of settlement unit
  asustusyksus: string // Name of settlement unit
  vaikekoht: string // Name of territorial unit
  liikluspind: string // Name of traffic space
  nimi: string // Name
  aadress_nr: string // Address number
  kood4: string // Code of territorial unit
  kood5: string // Code of traffic space
  kood6: string // Code of name
  kood7: string // Code of address number
  kood8: string // Code of apartment number
  kort_nr: string // Apartment number
  uus_kort: string // An apartment non-existing in ADS.
  koodaadress: string // Code address - made of codes of address classifiers
  asum: string // Settelment name
  sihtnumber: string // Postal code
  viitepunkt_x: string // L-EST x coordinate (6 decimal places) of object’s reference point
  viitepunkt_y: string // L-EST y coordinate (7 decimal places) of object’s reference point
  boundingbox: string // Address object’s BoundingBox, i.e. a rectangular box in which the address object is contained.
  viitepunkt_l: string // Geographic coordinate of object’s reference point – east longitude
  viitepunkt_b: string // Geographic coordinate of object’s reference point – north latitude
  g_boundingbox: string // Address object’s BoundingBox, i.e. a rectangular box in geographical coordinates in which the address object is contained.
  poid: string[], // Point of interest
  poidDetail: PoiDetail[] // List of details of points of interest
  tehn_id: string // Technical id
  tehn_id2: string // Technical id
  appartments: EstonianAddressApartment[] // List of apartments
  kort_orig_tunnus: string // Apartment’s identifier in original register
  kort_unik: string // (value 0 or 1) Apartment with the uniqueness requirement.
  kort_ads_oid: string // Identifier of apartment’s address object
  kort_adr_id: string // Identifier of apartment’s address
  kort_adob_id: string // Version id of apartment’s address object
  kvaliteet: string // The identifier by which the given object was found in the response. Possible values are described in chapter 7.2.16
  primary: string // If it is the most primary object among the given addresses, the value of this parameter is true
  kaugus: string // Distance between the object found and given location in meters.
  buildings: string // List of buildings related to the cadastral unit
  parcels: string[] // List of cadastral units related to the building
  seos_ar: CommercialRegisterData[] // object connections in ÄR
  seos_kr: LandRegistryData[] // Object connections in KR
  ehr: EhrData[] // EHR details of the building or part of a building
}

export interface CommercialRegisterData {
  registrikood: string // Commercial Register Id
  lisainfo: string // Additional information
}

export interface LandRegistryData {
  registrikood: string // Land registry part number
  eraomandi_nr: string // Private property number
}

export interface EhrData {
  ehr_kood: string // EHR code
  ehitise_nimetus: string // Name of the building
  ehitisealune_pind: string // Area under the building
  kasutusotstarbed: string // Uses of the building
  seisund: string // Condition of the building
  andmed_seisuga: string // As of the date the data was inherited
  ruumi_pind: string // Area of the room
  sissepaasu_korrus: string // Entrance floor
  andmeseis_kp: string // As of the date the data was inherited
  avalik_alias: string // Public alias
  avalik_nimi: string // The official name of the KNR object. If the former is missing, the unofficial first name. If the former are missing, the other official names in the data are the first name
  ehak: string // EHAK code
  ehakmk: string // EHAK county code
  ehakov: string // EHAK municipality code
  esindusaadress: string // Representative address of the KNR object
  knr_id: string // KNR identifier in the register of origin
  kuju: string // For informal areas L-EST EPSG: 3301 format WKT format
  kvaliteet: string // The identifier by which the given object was found in the response. Possible values are described in chapter 7.2.16
  tyyp: string // Codevalue of the type
  tyyp_grupp: string // Name of the group
  tyyp_nimi: string // Type name in text form
  tyyp_ylemgrupp: string // Type group code
  viitepunkt_b: string // KNR Geographical coordinate of the object reference point - north latitude
  viitepunkt_l: string // KNR Geographical coordinate of the object reference point - longitude east
  viitepunkt_x: string // The 6-digit mathematical L-EST x-coordinate of the KNR object reference point, corresponds to the geographical y-coordinate
  viitepunkt_y: string // The 7-digit mathematical L-EST y-coordinate of the KNR object reference point, corresponds to the geographical x-coordinate
  primary: string // If it is the most primary object among the givenaddresses, the value of this parameter is true
  hoone_ads_oid: string // If the basic data of the response contains the data of thebuilding part, then the given parameter contains the ADSOID value of the building
  tapne_lahiaadress: string // The input corresponds to a nearby address, for example "Endla tn 4a", with the answer " Endla tn 4a, Kesklinna linnaosa, Tallinn, Harju maakond". Addresses
  tapne_taisaadress: string // The input corresponds to the full address, for example „Endla tn 4a, Kesklinna linnaosa, Tallinn, Harju maakond“, the answer „Endla tn 4a, Kesklinna linnaosa, Tallinn, Harju maakond“. Addresses
  osaline: string // The full address in the reply contains the search phrase. For example, search for the phrase „Endla tn 4“ and the answer is „Endla tn 41, Viljandi linn, Viljandi maakond“. If the input was "Endla 4a", then the partial matches are also "Endla tee 4a", "Endla pst 4a", etc. Occurs in combination with other quality values, such as partial, tap_no. Addresses, POI, KNR
  lahiajalugu: string // The answer was found in recent history (address changes since 2011). For example „Ristiku 4 Läänemaa“, whose answer „Ristiku tn 4, Lihula linn, Lääneranna vald, Pärnu maakond“. Addresses
  eelajalugu: string // The answer was found in prehistory (address changes before 2011). For example „Lenini 4“, whose answer „Kaubamaja tn 4, Kesklinna linnaosa, Tallinn, Harju maakond“. Addresses
  poi: string // The answer was found through the point of interest. For example „Linnahall“, whose answer „Sadama tn 1, PõhjaTallinna linnaosa, Tallinn, Harju maakond“. Addresses
  ajalky: string // It is an invalid cadastral unit and the answer contains the data of the valid cadastral unit located at the reference point of this invalid cadastral unit and the form of the invalid cadastral unit or, in the absence thereof, the reference point. Addresses
  koord: string // The answer was found by coordinates. Addresses
  'ma-piirkond': string // The answer was found in the informal area. Addresses
  adsoid: string // Exact matches by identifiers. Addresses
  adrid: string // Exact matches by identifiers. Addresses
  adobid: string // Exact matches by identifiers. Addresses
  origtunnus: string // A match found based on the identifier or code of the original registry of the object. Addresses
  'osaline-tunnus': string // The answer was found based on the partial identifier. Addresses
  sihtnumber: string // An answer was found with the zip filter. Addresses
  synonyymid: string // The answer is found by synonym. Addresses
  paralleelaadress: string // Found by parallel addresses / Optimized by full address. Addresses
  tapne_nr: string // For example „Ehitajate tee 139a“ comes for the first time for some reason, but the exact one is instead „Ehitajate tee 139“ and the latter must receive indications of its quality as being an exact numerical equivalent. If a dead_address or exact_address address is found, this attribute will not be given. Addresses
  tapne: string // The exact public name is found in the KOHU searches POI, KNR
}

export interface EstonianAddressApartment {
  tahis: string // Apartment number
  tunnus: string // Address object’s id in original register
  unik: string // When value is 1, only objects with uniqueness requirement are returned.
  koodaadress: string // Code address - made of codes of address classifiers
  ads_oid: string // Value of address object identifier (throughout all versions)
  adr_id: string // Unique key of address – identifier of address verson.
  adob_id: string // Version id of address object in ADS.
}

export function toAddress(estonianAddress: EstonianAddress): Address {
  return {
    id: estonianAddress.adr_id,
    countryCode: CountryCode.EE,
    county: estonianAddress.maakond,
    municipality: estonianAddress.omavalitsus,
    area: estonianAddress.asustusyksus || estonianAddress.asum,
    street: estonianAddress.liikluspind,
    building: estonianAddress.aadress_nr,
    apartment: estonianAddress.kort_nr,
    details: estonianAddress.ipikkaadress,
    postalCode: estonianAddress.sihtnumber
  }
}

class EstonianAddressRegisterApi {
  private controller?: AbortController

  async search(request: EstonianAddressSearchRequest): Promise<EstonianAddressSearchResponse> {
    this.controller?.abort()
    this.controller = new AbortController()
    const res = await fetch(this.getUrl(request), {method: 'GET', signal: this.controller.signal, mode: 'cors'})
    if (res.status < 200 || res.status >= 400) throw new Error('Failed: ' + res.status)
    else return await res.json()
  }

  async searchAddress(request: EstonianAddressSearchRequest): Promise<EstonianAddress[]> {
    return (await this.search(request))?.addresses || []
  }

  async getByAdrId(adrid: string): Promise<EstonianAddress | undefined> {
    return (await this.searchAddress({adrid} as AddressById))[0]
  }

  async getApartments(hooneoid: string): Promise<EstonianAddressApartment[]> {
    return (await this.search({hooneoid} as ApartmentsByOid))?.appartments || []
  }

  private getUrl(request: EstonianAddressSearchParameters): string {
    const url = new URL(basePath)
    Object.entries(request)
      .filter(([ignore, value]) => value !== undefined)
      .forEach(([key, value]) => {
        if (value === true) url.searchParams.append(key, '1')
        else if (value === false) url.searchParams.append(key, '0')
        else url.searchParams.append(key, value)
      })
    return url.toString().replace(/%2C/g, ',')
  }
}

export default new EstonianAddressRegisterApi()
