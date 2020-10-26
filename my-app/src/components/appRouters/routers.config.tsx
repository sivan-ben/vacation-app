import Register from '../register'
import Login from '../login'
import VacationList from '../vacation-list'
import AdminComponent from '../admin'
import AddVacation from '../addVacation'
import ChartAdmin from '../charts'

export const routes = [

    { exact: true, isVisible: false, private: false, isAdmin: false, title: "register", path: "/register", component: Register },
    { exact: true, isVisible: false, private: false, isAdmin: false, title: "log out", path: "/login", component: Login },
    { exact: true, isVisible: false, private: false, isAdmin: false, title: "login", path: "/", component: Login },
    { exact: true, isVisible: false, private: true, isAdmin: false, title: "vacations", path: "/vacations", component: VacationList },
    { exact: true, isVisible: false, private: true, isAdmin: true, title: "home", path: "/admin", component: AdminComponent },
    { exact: true, isVisible: false, private: true, isAdmin: true, title: "addVacation", path: "/addVacation", component: AddVacation },
    { exact: true, isVisible: false, private: true, isAdmin: true, title: "chart", path: "/chart", component: ChartAdmin }
]