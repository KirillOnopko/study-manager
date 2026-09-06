import { getDashboardDataService } from "../services/dashboardServices.js"

async function getDashboardData(req, res) {
    const result = await getDashboardDataService(req.user.id)

    res.status(200).json(result)
}

export {getDashboardData}