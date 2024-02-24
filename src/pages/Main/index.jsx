import { useCallback, useState } from 'react'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Form, SubmitButton, RepositoriesList, DeleteButton, ErrorSubmit } from './styles'
import api from '../../services/api'
import { useLocalStorage } from '../../hooks/useLocalStorage.jsx'
import { Link } from 'react-router-dom'

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [repositorios, setRepositorios] = useLocalStorage('repos', []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        setLoading(true);
        setAlert(null);

        try {
            if (newRepo === '') {
                throw new Error('*você precisa indicar um repositório');
            }

            const response = await api.get(`repos/${newRepo}`);

            const hasRepo = repositorios.find(repo => repo.name === newRepo);

            if (hasRepo) {
                throw new Error('*repositório duplicado');
            }

            const data = {
                name: response.data.full_name,
            };

            setRepositorios([...repositorios, data]);
            setNewRepo('');
        } catch (error) {
            if (error.code === 'ERR_BAD_REQUEST') {
                error.message = '*esse repositório não existe. Por favor, verifique o nome e tente novamente';
            }

            setAlert(error);
        } finally {
            setLoading(false);
        }
    }, [newRepo, repositorios, setRepositorios]);

    const handleinputChange = (e) => {
        setNewRepo(e.target.value);
        setAlert(null);
    };

    const handleDelete = useCallback((repoName) => {
        const updatedRepos = repositorios.filter(repo => repo.name !== repoName);
        setRepositorios(updatedRepos);
    }, [repositorios, setRepositorios]);

    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Repositorios
            </h1>
            <Form onSubmit={handleSubmit} error={alert}>
                <input
                    type="text"
                    placeholder="Adicionar Repositorios"
                    value={newRepo}
                    onChange={handleinputChange}
                />
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>
            <ErrorSubmit>
                {alert && <span>{alert.message}</span>}
            </ErrorSubmit>
            <RepositoriesList>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton>
                                <FaTrash size={14} onClick={() => handleDelete(repo.name)} />
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </RepositoriesList>
        </Container>
    );
}
