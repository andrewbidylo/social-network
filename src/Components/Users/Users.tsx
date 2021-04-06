import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { FilterFormType, getUsers, follow, unfollow} from '../../redux/usersPageReducer'
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUserCount, getUsersFilter, getUsersList } from '../../redux/usersSelectors'
import Paginator from '../Common/Paginator/Paginator'
import Preloader from '../Common/Preloader/Preloader'
import User from './User'
import { UsersSearchForm } from './UsersSearchForm'
import * as queryString from 'querystring'


type PropsType = {
}
type QueryParamsType = {term?:string, page?:string, friend?:string }

export const Users: React.FC<PropsType> = () => {

    // HOOKS
    const isFetching = useSelector(getIsFetching)
    const currentPage = useSelector(getCurrentPage)
    const totalCount = useSelector(getTotalUserCount)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsersList)
    const followingInProgress = useSelector(getFollowingInProgress)

  
    const followUser = (userId: number) => { dispatch(follow(userId)) }
    const unfollowUser = (userId: number) => { dispatch(unfollow(userId)) }

    const dispatch = useDispatch()
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterFormType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const history = useHistory()

// Synchronize a search field with BLL

    useEffect(() => {
        const parsedSearch = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsedSearch.page) actualPage = Number (parsedSearch.page)
        if (!!parsedSearch.term) actualFilter = {...actualFilter, term: parsedSearch.term as string}
        switch (parsedSearch.friend){
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [currentPage,history.location.search,dispatch,filter,pageSize])

    useEffect(()=>{
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String (currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    },[filter,currentPage,history])

    return <div>
    {/* Turn on preloader */}
        {isFetching ? <Preloader /> : null}
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalCount} pageSize={pageSize} />
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
        </div>
        <div>   
            {
                users.map(u => <User user={u} key={u.id}
                    followingInProgress={followingInProgress}
                    unfollow={unfollowUser}
                    follow={followUser}
                />)}
        </div>
    </div>
}
