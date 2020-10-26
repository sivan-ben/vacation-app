import mainAxios from '../components/axios'
import actions from './action.config'

export const setUser = (user: any) => {
    return {
        type: actions.SET_USER,
        payload: user
    }
}

export const setVacations = (vacations: any) => {
    return {
        type: actions.SET_VACATIONS,
        payload: vacations
    }
}

export const setIsAdmin = (user: any) => {
    return {
        type: actions.SAVE_ADMIN,
        payload: user
    }
}


export const deleteVacationAction = (vacationId: any) => async (dispatch: any) => {
    const res = await mainAxios.delete('/deleteVacation', {
        data: {
            vacationId: vacationId
        }
    });
    dispatch(setVacations(res.data.vacations))
}

export const editVacationAction = (data: any) => async (dispatch: any) => {
    try {
        const result = await mainAxios.put('/editVacation', data)
        console.log(result.data)
        dispatch(setVacations(result.data.vacations))
    } catch (error) {
        alert("some err")
    }

}

export const addFolloweAction = (vacationId: any) => async (dispatch: any) => {
    try {
        const res = await mainAxios.post('/addFolow', {
            vacationId: vacationId
        })
        dispatch(setVacations(res.data.vacations))
    } catch (err) {
        alert("some err")
    }
}

export const saveVacationAction = (data: any, props: any) => async (dispatch: any) => {
    try {
        const result = await mainAxios.post('/saveVacation', data)
        console.log(data, "data from add vacation")
        const { redirect } = result.data
        if (redirect) {
            props.history.push("/admin")
        }
    } catch (error) {

    }
}

export const deleteUser = () => {
    return {
        type: actions.DELETE_USER,

    }
}

