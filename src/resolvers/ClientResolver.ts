import ClientController from "../controllers/ClientController"

export const ClientQueryResolver = {

        clients: ClientController.listAllClients,
        client: ClientController.getClientByID
    
}

export const ClientMutationResolver = {

        login: ClientController.login,
        register: ClientController.registerclient,
        updateCellphone: ClientController.updateTel

}