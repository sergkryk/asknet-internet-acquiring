import { initSoapClient } from "../controllers/tbank";
import { SoapServiceCategory } from "../soap/types";

function createTarifsManager() {
    // declares services list
    const services: SoapServiceCategory[] = []
    // indicates that services are loaded from database
    let isLoaded = false;
    // gets services from database
    async function loadServices() {
        if (!isLoaded) {
            const dbClient = await initSoapClient()
            const service = await dbClient.getServiceCategories()
            for (let i = 0; i < service.length; i++) {
                services.push(service[i])
            }             
            isLoaded = true;
        }
    }
    // filters services by tarid
    async function getServiceByTarid(tarid: number) {
        if (!isLoaded) {
            await loadServices();
        }
        return services.filter((el) => el.tarid === tarid)
    }
    return { getServiceByTarid };
}

export const tarifsManager = createTarifsManager();
