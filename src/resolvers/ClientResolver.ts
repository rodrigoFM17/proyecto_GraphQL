import ClientController from "../controllers/ClientController"

const ClientResolver = {

        clients: ClientController.listAllClients,
        client: ClientController.getClientByID
    
}

export default ClientResolver