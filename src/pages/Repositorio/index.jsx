import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Ownre, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api'

export default function Repositorio() {

    const { repositorio } = useParams();

    const [Currentrepo, setCurrentrepo] = useState({})

    const [issues, setIssues] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState([
        { state: 'all', label: 'Todas', active: true },
        { state: 'open', label: 'Abertas', active: false },
        { state: 'closed', label: 'Fechadas', active: false }
    ])
    const [filterIndex, setFilterIndex] = useState(0)
    
    img

    useEffect(() => {

        async function load() {

            const [repositorioData, issuesData] = await Promise.all([

                api.get(`/repos/${repositorio}`),
                api.get(`/repos/${repositorio}/issues`, {
                    params: {
                        state: filters.find(f => f.active).state,
                        per_page: 5
                    }
                })
            ])

            setCurrentrepo(repositorioData.data)
            setIssues(issuesData.data)
            setloading(false)
        }

        load()
    }, [filters])

    const handlePage = (action) => {
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    useEffect(() => {

        async function loadIssue() {

            const response = await api.get(`/repos/${repositorio}/issues`, {

                params: {
                    state: filters[filterIndex].state,
                    page: page,
                    per_page: 5,
                }

            });

            setIssues(response.data)
        }

        loadIssue()

    }, [filters, page, filterIndex])

    function handleFilter(index) {
        setFilterIndex(index)
    }

    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>

            <BackButton to='/'>
                <FaArrowLeft color='#000' size={30} />
            </BackButton>

            <Ownre>

                <img src={Currentrepo.owner.avatar_url} alt={Currentrepo.owner.login} />
                <h1 >{Currentrepo.name}</h1>
                <p>{Currentrepo.description}</p>

            </Ownre>

            <FilterList active={filterIndex}>
                {filters && filters.length > 0 ? (
                    filters.map((filter, index) => (
                        <button type='button' key={filter.label} onClick={() => { handleFilter(index) }}>
                            {filter.label}
                        </button>
                    ))
                ) : (
                    <p>No filters available.</p>
                )}
            </FilterList>



            <IssuesList>
                {issues && issues.length > 0 ? (
                    issues.map((issue) => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map((label) => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>User name: {issue.user.login}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No issues found.</li>
                )}
            </IssuesList>

            <PageActions>

                <button type='button' onClick={() => handlePage('back')} disabled={page < 2}>Voltar</button>

                <button type='button' onClick={() => handlePage('next')}>Avançar</button>

            </PageActions>
        </Container>
    );
}
