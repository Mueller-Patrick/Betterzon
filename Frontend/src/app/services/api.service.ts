import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import process from 'process';
import {Product} from '../models/product';
import {Deal, Price} from '../models/price';
import {Observable, of} from 'rxjs';
import {Vendor} from '../models/vendor';
import {PriceAlarm} from '../models/pricealarm';
import {FavoriteShop} from '../models/favoriteshop';
import {ContactPerson} from '../models/contactperson';
import {Category} from '../models/category';
import {Manufacturer} from '../models/manufacturer';
import {CrawlingStatus} from '../models/crawlingstatus';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiUrl = 'https://backend.betterzon.xyz';

    constructor(
        private http: HttpClient
    ) {
    }


    /*   ____                 __           __
        / __ \_________  ____/ /_  _______/ /______
       / /_/ / ___/ __ \/ __  / / / / ___/ __/ ___/
      / ____/ /  / /_/ / /_/ / /_/ / /__/ /_(__  )
     /_/   /_/   \____/\__,_/\__,_/\___/\__/____/
    */

    /**
     * Gets the specified product from the API
     * @param id The id of the product to get
     * @return Observable<Product> An observable containing a single product
     */
    getProduct(id: number): Observable<Product> {
        try {
            return this.http.get<Product>((this.apiUrl + '/products/' + id));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /**
     * Gets a list of products that match the given search term
     * @param query The search term to match
     * @return Observable<Product[]> An observable list of products
     */
    getProductsByQuery(query: string): Observable<Product[]> {
        try {
            return this.http.get<Product[]>((this.apiUrl + '/products/search/' + query));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of all products
     * @return Observable<Product[]> An observable list of products
     */
    getProducts(): Observable<Product[]> {
        try {
            return this.http.get<Product[]>((this.apiUrl + '/products'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of all specified products
     * @param ids The ids of the products to get
     * @return Observable<Product[]> An observable list of products
     */
    getProductsByIds(ids: number[]): Observable<Product[]> {
        try {
            return this.http.get<Product[]>((this.apiUrl + '/products/list/[' + ids.toString() + ']'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of all products that are available at the specified vendor
     * @param vendor The vendor to get the products for
     * @return Observable<Product[]> An observable list of products
     */
    getProductsByVendor(vendor: number): Observable<Product[]> {
        try {
            return this.http.get<Product[]>((this.apiUrl + '/products/vendor/' + vendor));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Creates a new product entry
     * @param asinOrLink The amazon link or asin of the product
     * @return Observable<any> The observable response of the api
     */
    addNewProduct(asinOrLink: string): Observable<any> {
        let asin = '';

        // Check if the parameter is a link or an asin
        const linkRegex: RegExp = /^http[s]{0,1}:\/\/.*\/dp\/(.[^\/]*)\/{0,1}.*$/;
        const matches = linkRegex.exec(asinOrLink);
        if (matches) {
            // param is a link, extract asin
            asin = matches[1] ?? '';
        } else {
            // param is not a link, suspect it is an asin
            asin = asinOrLink;
        }

        try {
            return this.http.post((this.apiUrl + '/products'), JSON.stringify({
                asin
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /*    ____       _
         / __ \_____(_)_______  _____
        / /_/ / ___/ / ___/ _ \/ ___/
       / ____/ /  / / /__/  __(__  )
      /_/   /_/  /_/\___/\___/____/
     */

    /**
     * Gets the specified price from the API
     * @param id The id of the price to get
     * @return Observable<Price> An observable containing a single price
     */
    getPrice(id: number): Observable<Price> {
        try {
            return this.http.get<Price>((this.apiUrl + '/prices/' + id));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of all prices
     * @return Observable<Price[]> An observable list of prices
     */
    getPrices(): Observable<Price[]> {
        try {
            return this.http.get<Price[]>((this.apiUrl + '/prices'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets the lowest prices of every vendor for the given product
     * @param productId The product id of the product to fetch the prices for
     * @return Observable<Price[]> An observable list of prices
     */
    getLowestPrices(productId: number): Observable<Price[]> {
        try {
            let params = new HttpParams();
            params = params.append('product', productId.toString());
            params = params.append('type', 'lowest');
            return this.http.get<Price[]>((this.apiUrl + '/prices'), {params});
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets the latest amazon price for the given product
     * @param productId The product id of the product to get the price for
     * @return Observable<Price> An observable containing a single price
     */
    getAmazonPrice(productId: number): Observable<Price> {
        try {
            let params = new HttpParams();
            params = params.append('product', productId.toString());
            params = params.append('vendor', '1');
            params = params.append('type', 'newest');
            return this.http.get<Price>((this.apiUrl + '/prices'), {params});
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets the newest prices of every vendor for the given product
     * @param productId The product id of the product to fetch the prices for
     * @return Observable<Price[]> An observable list of prices
     */
    getCurrentPricePerVendor(productId: number): Observable<Price[]> {
        try {
            let params = new HttpParams();
            params = params.append('product', productId.toString());
            params = params.append('type', 'newest');
            return this.http.get<Price[]>((this.apiUrl + '/prices'), {params});
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets the currently best deals
     * @param amount The amount of deals to get
     * @return Observable<Deal[]> An observable list of deals
     */
    getBestDeals(amount: number): Observable<Deal[]> {
        try {
            return this.http.get<Deal[]>((this.apiUrl + '/prices/bestDeals/' + amount));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of all prices for the specified product
     * @param product The product to get prices for
     * @return Observable<Price[]> An observable list of prices
     */
    getPricesByProduct(products: number[]): Observable<Price[]> {
        try {
            console.log('IDs: ' + products.toString());
            return this.http.get<Price[]>((this.apiUrl + '/prices/byProduct/list/[' + products.toString() + ']'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Creates a new price entry
     * @param vendorId The vendor to add the price for
     * @param productId The product to add the price to
     * @param price The price in cents to add
     * @return Observable<any> The observable response of the api
     */
    addNewPrice(vendorId: number, productId: number, price: number): Observable<any> {
        try {
            return this.http.post((this.apiUrl + '/prices'), JSON.stringify({
                vendor_id: vendorId,
                product_id: productId,
                price_in_cents: price
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /*  _    __               __
       | |  / /__  ____  ____/ /___  __________
       | | / / _ \/ __ \/ __  / __ \/ ___/ ___/
       | |/ /  __/ / / / /_/ / /_/ / /  (__  )
       |___/\___/_/ /_/\__,_/\____/_/  /____/
     */

    /**
     * Gets a list of all vendors
     * @return Observable<Vendor[]> An observable list of vendors
     */
    getVendors(): Observable<Vendor[]> {
        try {
            return this.http.get<Vendor[]>((this.apiUrl + '/vendors'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of all managed vendors
     * @return Observable<Vendor[]> An observable list of vendors
     */
    getManagedVendors(): Observable<Vendor[]> {
        try {
            return this.http.get<Vendor[]>((this.apiUrl + '/vendors/managed'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Get the specific vendor info by vendor id
     * @param id The id of the vendor to get information for
     * @return Observable<Vendor> An observable containing a single vendor
     */
    getVendorById(id: number): Observable<Vendor> {
        try {
            return this.http.get<Vendor>((this.apiUrl + '/vendors/' + id));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of vendors that match the given search term
     * @param query The search term to match
     * @return Observable<Product[]> An observable list of vendors
     */
    getVendorsByQuery(query: string): Observable<Vendor[]> {
        try {
            return this.http.get<Vendor[]>((this.apiUrl + '/vendors/search/' + query));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Deactivates the specified product listing for the specified vendor
     * @param vendorId The vendor id of the vendor to deactivate the product for
     * @param productId The product id of the product to deactivate
     * @return Observable<any> The observable response of the api
     */
    deactivateSingleVendorListing(vendorId: number, productId: number): Observable<any> {
        try {
            return this.http.put((this.apiUrl + '/vendors/manage/deactivatelisting'), JSON.stringify({
                vendor_id: vendorId,
                product_id: productId
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Deactivates the specified vendor completely
     * @param vendorId The vendor id of the vendor to deactivate
     * @return Observable<any> The observable response of the api
     */
    deactivateVendor(vendorId: number): Observable<any> {
        try {
            return this.http.put((this.apiUrl + '/vendors/manage/shop/deactivate/' + vendorId), JSON.stringify({}));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Activates the specified vendor completely
     * @param vendorId The vendor id of the vendor to activate
     * @return Observable<any> The observable response of the api
     */
    activateVendor(vendorId: number): Observable<any> {
        try {
            return this.http.put((this.apiUrl + '/vendors/manage/shop/activate/' + vendorId), JSON.stringify({}));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /*     ____       _              ___    __
          / __ \_____(_)_______     /   |  / /___ __________ ___  _____
         / /_/ / ___/ / ___/ _ \   / /| | / / __ `/ ___/ __ `__ \/ ___/
        / ____/ /  / / /__/  __/  / ___ |/ / /_/ / /  / / / / / (__  )
       /_/   /_/  /_/\___/\___/  /_/  |_/_/\__,_/_/  /_/ /_/ /_/____/
     */

    /**
     * Gets a list of all price alarms
     * @return Observable<PriceAlarm[]> An observable list of price alarms
     */
    getPriceAlarms(): Observable<PriceAlarm[]> {
        try {
            return this.http.get<PriceAlarm[]>((this.apiUrl + '/pricealarms'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Creates a new price alarm
     * @param productId The product id of the product to create the alarm for
     * @param definedPrice The defined target price
     * @return Observable<any> The observable response of the api
     */
    createPriceAlarms(productId: number, definedPrice: number): Observable<any> {
        try {
            return this.http.post((this.apiUrl + '/pricealarms'), JSON.stringify({
                product_id: productId,
                defined_price: definedPrice
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Updates the given price alarm
     * @param alarmId The alarm id of the alarm to update
     * @param definedPrice The defined target price
     * @return Observable<any> The observable response of the api
     */
    updatePriceAlarms(alarmId: number, definedPrice: number): Observable<any> {
        try {
            return this.http.put((this.apiUrl + '/pricealarms'), JSON.stringify({
                alarm_id: alarmId,
                defined_price: definedPrice
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /*     __  __
          / / / /_______  __________
         / / / / ___/ _ \/ ___/ ___/
        / /_/ (__  )  __/ /  (__  )
        \____/____/\___/_/  /____/
     */

    /**
     * Registers a new user with the API
     * @param username The username for the new user
     * @param password The password for the new user
     * @param email The email address for the new user
     * @return Observable<any> The observable response of the api
     */
    registerUser(username: string, password: string, email: string): Observable<any> {
        try {
            return this.http.post((this.apiUrl + '/users/register'), JSON.stringify({
                username,
                password,
                email
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Logs a user in with the api
     * @param username The username of the user to log in
     * @param password The password of the user to log in
     * @return Observable<any> The observable response of the api
     */
    loginUser(username: string, password: string): Observable<any> {
        try {
            return this.http.post((this.apiUrl + '/users/login'), JSON.stringify({
                username,
                password
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Get all required information about the currently logged in user. If the user is not logged in or the
     * session is not valid anymore, a 401 will come back from the backend.
     * @return Observable<any> The observable response of the api
     */
    getUserInfo(): Observable<any> {
        try {
            return this.http.post((this.apiUrl + '/users/checkSessionValid'), {});
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /*       ______                       _ __               __
            / ____/___ __   ______  _____(_) /____     _____/ /_  ____  ____  _____
           / /_  / __ `/ | / / __ \/ ___/ / __/ _ \   / ___/ __ \/ __ \/ __ \/ ___/
          / __/ / /_/ /| |/ / /_/ / /  / / /_/  __/  (__  ) / / / /_/ / /_/ (__  )
         /_/    \__,_/ |___/\____/_/  /_/\__/\___/  /____/_/ /_/\____/ .___/____/
                                                                    /_/
     */

    /**
     * Gets a list of all favorite shops
     * @return Observable<FavoriteShop[]> An observable list of favorite shops
     */
    getFavoriteShops(): Observable<FavoriteShop[]> {
        try {
            return this.http.get<FavoriteShop[]>((this.apiUrl + '/favoriteshops'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Adds a vendor as a favorite
     * @param vendorId The id of the vendor to mark as favorite
     * @return Observable<any> The observable response of the api
     */
    addFavoriteShop(vendorId: number): Observable<any> {
        try {
            return this.http.post((this.apiUrl + '/favoriteshops'), JSON.stringify({
                vendor_id: vendorId
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Deletes a vendor from favorites
     * @param vendorId The id of the vendor to delete from favorites
     * @return Observable<any> The observable response of the api
     */
    deleteFavoriteShop(vendorId: number): Observable<any> {
        try {
            return this.http.delete((this.apiUrl + '/favoriteshops/' + vendorId));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /*     ______            __             __     ____
          / ____/___  ____  / /_____ ______/ /_   / __ \___  ______________  ____  _____
         / /   / __ \/ __ \/ __/ __ `/ ___/ __/  / /_/ / _ \/ ___/ ___/ __ \/ __ \/ ___/
        / /___/ /_/ / / / / /_/ /_/ / /__/ /_   / ____/  __/ /  (__  ) /_/ / / / (__  )
        \____/\____/_/ /_/\__/\__,_/\___/\__/  /_/    \___/_/  /____/\____/_/ /_/____/
     */

    /**
     * Gets a list of all contact persons
     * @return Observable<ContactPerson[]> An observable list of contact persons
     */
    getContactPersons(): Observable<ContactPerson[]> {
        try {
            return this.http.get<ContactPerson[]>((this.apiUrl + '/contactpersons'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets the specified contact person by id
     * @param id the id of the contact person to get info about
     * @return Observable<ContactPerson> An observable containing a single contact person
     */
    getContactPersonById(id: number): Observable<ContactPerson> {
        try {
            return this.http.get<ContactPerson>((this.apiUrl + '/contactpersons/' + id));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets the contact persons for the specified vendor
     * @param vendorId the id of the vendor to get the contact persons for
     * @return Observable<ContactPerson[]> An observable list of contact persons
     */
    getContactPersonsByVendor(vendorId: number): Observable<ContactPerson[]> {
        try {
            return this.http.get<ContactPerson[]>((this.apiUrl + '/contactpersons/byvendor/' + vendorId));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Adds a contact person for the specified vendor
     * @param vendorId The id of the vendor to mark as favorite
     * @param firstName The given name of the contact person
     * @param lastName The family name of the contact person
     * @param gender The gender of the contact person
     * @param email The email address of the contact person
     * @param phone The phone number of the contact person
     * @return Observable<any> The observable response of the api
     */
    addContactPerson(vendorId: number, firstName: string, lastName: string, gender: string, email: string, phone: string): Observable<any> {
        try {
            return this.http.post((this.apiUrl + '/contactpersons'), JSON.stringify({
                vendor_id: vendorId,
                first_name: firstName,
                last_name: lastName,
                gender,
                email,
                phone
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Updates the specified contact person record
     * @param contactId The id of the contact person record
     * @param vendorId The id of the vendor to mark as favorite
     * @param firstName The given name of the contact person
     * @param lastName The family name of the contact person
     * @param gender The gender of the contact person
     * @param email The email address of the contact person
     * @param phone The phone number of the contact person
     * @return Observable<any> The observable response of the api
     */
    updateContactPerson(contactId: number, vendorId: number, firstName: string, lastName: string, gender: string, email: string, phone: string): Observable<any> {
        try {
            return this.http.put((this.apiUrl + '/contactpersons/' + contactId), JSON.stringify({
                vendor_id: vendorId,
                first_name: firstName,
                last_name: lastName,
                gender,
                email,
                phone
            }));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /*     ______      __                        _
          / ____/___ _/ /____  ____ _____  _____(_)__  _____
         / /   / __ `/ __/ _ \/ __ `/ __ \/ ___/ / _ \/ ___/
        / /___/ /_/ / /_/  __/ /_/ / /_/ / /  / /  __(__  )
        \____/\__,_/\__/\___/\__, /\____/_/  /_/\___/____/
                            /____/
     */

    /**
     * Gets the specified category from the API
     * @param id The id of the category to get
     * @return Observable<Category> An observable containing a single category
     */
    getCategoryById(id: number): Observable<Category> {
        try {
            return this.http.get<Category>((this.apiUrl + '/categories/' + id));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /**
     * Gets a list of categories that match the given search term
     * @param query The search term to match
     * @return Observable<Category[]> An observable list of categories
     */
    getCategoriesByQuery(query: string): Observable<Category[]> {
        try {
            return this.http.get<Category[]>((this.apiUrl + '/categories/search/' + query));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of all categories
     * @return Observable<Category[]> An observable list of categories
     */
    getCategories(): Observable<Category[]> {
        try {
            return this.http.get<Category[]>((this.apiUrl + '/categories'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /*     __  ___                  ____           __
          /  |/  /___ _____  __  __/ __/___ ______/ /___  __________  __________
         / /|_/ / __ `/ __ \/ / / / /_/ __ `/ ___/ __/ / / / ___/ _ \/ ___/ ___/
        / /  / / /_/ / / / / /_/ / __/ /_/ / /__/ /_/ /_/ / /  /  __/ /  (__  )
       /_/  /_/\__,_/_/ /_/\__,_/_/  \__,_/\___/\__/\__,_/_/   \___/_/  /____/
     */

    /**
     * Gets the specified manufacturer from the API
     * @param id The id of the manufacturer to get
     * @return Observable<Manufacturer> An observable containing a single manufacturer
     */
    getManufacturerById(id: number): Observable<Manufacturer> {
        try {
            return this.http.get<Manufacturer>((this.apiUrl + '/manufacturers/' + id));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /**
     * Gets a list of manufacturers that match the given search term
     * @param query The search term to match
     * @return Observable<Manufacturer[]> An observable list of manufacturers
     */
    getManufacturersByQuery(query: string): Observable<Manufacturer[]> {
        try {
            return this.http.get<Manufacturer[]>((this.apiUrl + '/manufacturers/search/' + query));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    /**
     * Gets a list of all manufacturers
     * @return Observable<Manufacturer[]> An observable list of manufacturer
     */
    getManufacturers(): Observable<Manufacturer[]> {
        try {
            return this.http.get<Manufacturer[]>((this.apiUrl + '/manufacturers'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }


    /*     ______                    ___                _____ __        __
          / ____/________ __      __/ (_)___  ____ _   / ___// /_____ _/ /___  _______
         / /   / ___/ __ `/ | /| / / / / __ \/ __ `/   \__ \/ __/ __ `/ __/ / / / ___/
        / /___/ /  / /_/ /| |/ |/ / / / / / / /_/ /   ___/ / /_/ /_/ / /_/ /_/ (__  )
        \____/_/   \__,_/ |__/|__/_/_/_/ /_/\__, /   /____/\__/\__,_/\__/\__,_/____/
                                           /____/
     */

    /**
     * Gets the current crawling status
     * @return Observable<CrawlingStatus> An observable containing a single crawling status object
     */
    getCurrentCrawlingStatus(): Observable<CrawlingStatus> {
        try {
            return this.http.get<CrawlingStatus>((this.apiUrl + '/crawlingstatus'));
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }
}
