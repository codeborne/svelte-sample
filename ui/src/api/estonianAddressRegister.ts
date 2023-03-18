import type {Address} from 'src/api/types'
import {CountryCode} from 'src/api/types'

const basePath = `https://inaadress.maaamet.ee/inaadress/gazetteer?`

/**
 * documentation: https://inaadress.maaamet.ee/inaadress/js/pdf/et/in_aadress_developer_manual.pdf
 */
export interface AddressSearch extends EstonianAddressSearchRequest {
  /**
   Search address text. Mandatory excl.
   if the parameters x and y are valued or the adsoid parameter are present.
   For value can be the address text to be searched for, origin registry identifier or ADS OID
   */
  address: string
}

export interface AddressById extends EstonianAddressSearchRequest {
  /**
   Unique technical identifier
   */
  adrid: string
}

export interface ObjectSearch extends EstonianAddressSearchRequest {
  /**
   Address object identifier (cross-version) list of values that wanted to search, separated with commas.
   Not mandatory if it is valued x and y or address parameter.
   */
  adsoid: string
}

export interface CoordinateSearch extends EstonianAddressSearchRequest {
  /**
   Mathematical L-EST x-coordinate (6- local, corresponds to the geographical y coordinate),
   according to which addresses is being sought. Not mandatory if it is valued address parameter.
   */
  x: string
  /**
   Mathematical L-EST y-coordinate (7- local, corresponds to the geographic xcoordinate) by which addresses is being sought
   */
  y: string
  /**
   Used with x and y parameters parameter that for a value of 1 allows you to find a given point nearest address.
   */
  nearest?: boolean
  /**
   Used with x and y parameters parameter whose value is radius in meters. Search for addresses inside the ring.
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

export interface EstonianAddressSearchRequest {
  /**
   Types of object searched (comma separator).
   If there is no value is searched by address, not by object by species.
   The parameter may be used with both the address parameter and LEST x (6-digit) and L-EST y (7-digit) coordinate.
   Possible values are: EHAK, VAIKEKOHT, KATASTRIYKSUS, TANAV ja EHITISHOONE
   */
  features?: Features[]
  /**
   If the value is 1, only is returned objects with a unique address requirement.
   */
  unik?: boolean
  /**
   Are you also looking for apartments? Possible values:
   false 0 - not searched,
   true 1 - searched apartments,
   undefined 2 - looking for apartments and in result the apartment data without building data (default option)
   */
  appartment?: number
  /**
   Maximum number of results. Possible the maximum value is 100, the default the value is 10.
   The parameter is not considered if the parameters x and y are valued.
   */
  results?: number
  /**
   Ehak filter
   */
  ehak?: string
  /**
   Can also search historical addresses. The value is the number of the year from which addresses are searched.
   If the parameter is absent, then by default it is also searched of all historical addresses.
   If the value is 0, then from historical ones addresses are not searched.
   */
  ihist?: string
  /**
   If 1 then returns spatial shapes of address objects JSON in GeoJSON format and XML in GML 3.2 format.
   The parameter can be used with address parameter
   */
  geometry?: string
  /**
   whether to use the address in the search History/POI/MA region help (value 1 or parameter missing) or not (value 0).
   In case of 0, the nearby or is not searched either of prehistory and does not consider ihis parameter.
   If the buoy parameter is 1, then if help=1 only is used history and MA area help.
   But in case The name part or alias of the POI is also included in the found in the address text,
   it may be indicated that the address was found using POI.
   */
  help?: boolean
  /**
   with a value of 1, POIs are displayed separately group and address are not used in the block part Looking for help from POIs.
   In case of POI the name part or alias is also included in the found in the address text, found is displayed object in the address block.
   */
  poi?: boolean
  /**
   with a value of 1, KNR objects is displayed as a separate group
   */
  knr?: boolean
  /**
   as the value KOHU object type (with a comma separately as several) which applies to the poi and with knr parameter
   with all KOHU to objects jointly. Possible values are 10, 11, 12, 13, 14, 15 and 16
   */
  type?: string
  /*
  Juhul kui knr parameetri väärtus on 1, siis antud parameetri väärtuse 1 korral tagastatakse ainult KNR objektide hulgast
  vaid asumeid, kvartaleid, väikesaari ja osavaldu
   */
  maPiirkond?: string
  /**
   with a value of 1 is also ensured findability of words with diacritical letters
   */
  iTappAsendus?: boolean
  /**
   * a value of 1 also returns all of buildings related to the found cadastral unit data or found related to the building cadastral unit data.
   * If appartment parameter value is 1 or 2 is also returned related to the building data of building parts.
   * The parameter can to be used with the address parameter
   */
  seos?: string
  /**
   * with a value of 1 is also returned object relations in ÄR and KR. The parameter can be used with address with a parameter
   */
  seosreg?: boolean
  /**
   * if the value is 1, it will be included in the response EHR building additional data. Parameters can be used with address with a parameter
   */
  ehr1?: string
  /**
   * if the value is 1, it will be included in the response EHR building part data. Parameters can be used with address with a parameter
   */
  ehr2?: string
  /**
   * with a value of 0, technical is not searched from among the addresses. Value in the absence, technical ones are also sought addresses
   */
  tech?: boolean
  /**
   * with a value of 1, is also searched from among cadastral units without cadastral connection
   * (Entered by the municipality in ADS cadastral units that are still in the cadastre not registered)
   */
  ky?: boolean
  /**
   * The adsoid value of the building, which building parts are wanted to be found
   */
  hooneoid?: string
}

export interface EstonianAddressSearchResponse {
  addresses: EstonianAddress[],
  host: string
}

export interface EstonianAddress {
  pikkaadress: string
  taisaadress: string
  ipikkaadress: string
  aadresstekst: string
  old_aadresstekst: string
  leitud_osa: string
  unik: string
  onkort: string
  liik: string
  liikVal: string
  tunnus: string
  ads_oid: string
  adr_id: string
  adob_id: string
  ehakmk: string
  maakond: string
  ehakov: string
  omavalitsus: string
  ehak: string
  asustusyksus: string
  kood4: string
  vaikekoht: string
  kood5: string
  liikluspind: string
  kood6: string
  nimi: string
  kood7: string
  aadress_nr: string
  kood8: string
  kort_nr: string
  koodaadress: string
  asum: string
  sihtnumber: string
  viitepunkt_x: string
  viitepunkt_y: string
  boundingbox: string
  viitepunkt_l: string
  viitepunkt_b: string
  g_boundingbox: string
  poid: [],
  tehn_id2: string
  appartments: EstonianAddressApartment[]
  kort_orig_tunnus: string
  kort_unik: string
  kort_ads_oid: string
  kort_adr_id: string
  kort_adob_id: string
  kvaliteet: string
  primary: string
}

export interface EstonianAddressApartment {
  tahis: string
  tunnus: string
  unik: string
  koodaadress: string
  ads_oid: string
  adr_id: string
  adob_id: string
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
  private controller?: AbortController = undefined

  async search(request: AddressSearch | ObjectSearch | CoordinateSearch | AddressById): Promise<EstonianAddress[]> {
    if (this.controller) {
      this.controller.abort()
    }
    this.controller = new AbortController()
    document.documentElement.classList.add('loading')
    return fetch(this.getUrl(request), {method: 'GET', signal: this.controller.signal, mode: 'cors'})
      .then(response => response.json())
      .then((response: EstonianAddressSearchResponse) => response?.addresses || [])
      .finally(() => document.documentElement.classList.remove('loading'))
  }

  async getByAdrId(adrid: string): Promise<EstonianAddress | undefined> {
    return (await this.search({adrid} as AddressById)).find(a => (a.adr_id) === adrid)
  }

  private getUrl(request: EstonianAddressSearchRequest): string {
    const url = new URL(basePath)
    Object.entries(request)
      .filter(([ignore, value]) => !!value)
      .forEach(([key, value]) => {
        if (value === true) {
          url.searchParams.append(key, '1')
        } else if (value === false) {
          url.searchParams.append(key, '0')
        } else {
          url.searchParams.append(key, value)
        }
      })
    return url.toString().replace(/%2C/g, ',')
  }
}

export default new EstonianAddressRegisterApi()
