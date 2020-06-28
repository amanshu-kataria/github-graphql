import React, { Fragment, useEffect, useState } from 'react';
import { Button, Divider, Icon, Item, Label, Popup } from 'semantic-ui-react';
import { IEdgeNode, IGithubProfile, IRepository, IUserQueryResponse } from '../interfaces/profile';
import { IApolloContext } from '../interfaces/apollo';
import { IAuthContext } from '../interfaces/auth';
import { useApolloContext } from '../hooks/apolloClient';
import { useAuth0 } from '../hooks/AuthContext';
import { useProfileContext } from '../context/profileContext';
import { userRepositories } from '../queries/user';

export default function Repositories() {
  const [clonedRepoId, setClonedRepoId] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [disableNextButton, toggleDisableNextButton] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<IEdgeNode<IRepository>>({
    edges: [],
    totalCount: 0
  });
  const githubProfile: IGithubProfile = useProfileContext();
  const { client }: IApolloContext = useApolloContext();
  const { user }: IAuthContext = useAuth0();

  useEffect(() => {
    if (githubProfile.repositories) {
      setRepositories(githubProfile.repositories);
      if (githubProfile.repositories.edges.length < 20) {
        toggleDisableNextButton(true);
      }
    }
  }, [githubProfile.repositories]);

  function onCopyCloneCommand(command: string, repoId: string) {
    navigator.clipboard.writeText(`git clone ${command}.git`);
    setClonedRepoId(repoId);
    setTimeout(() => {
      setClonedRepoId('');
    }, 2000);
  }

  function getPreviousOrNextRepos(type: 'before' | 'after') {
    if (client !== undefined) {
      const variables: any = {
        userName: user.nickname
      };
      if (type === 'after') {
        variables.after = repositories.edges[repositories.edges.length - 1].cursor;
      } else {
        variables.before = repositories.edges[0].cursor;
      }
      client
        .query({
          query: userRepositories,
          variables
        })
        .then((response: IUserQueryResponse) => {
          const { repositories } = response.data.user;
          if (repositories) {
            setRepositories(repositories);
            toggleDisableNextButton(repositories.edges.length < 20);
            setPage(type === 'after' ? page + 1 : page - 1);
            const repoList: HTMLElement = document.getElementById('repoList') as HTMLElement;
            repoList.scroll({
              top: 0,
              behavior: 'smooth'
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  return (
    <div id="repoList" className="repositories">
      <Item.Group>
        {repositories &&
          repositories.edges.map((repo: any) => (
            <Item key={repo.node.id}>
              <Item.Content>
                <Item.Header className="repositories__name" content={repo.node.name} />
                {repo.node.isFork && <Popup content="Forked" trigger={<Icon name="fork" />} />}
                {repo.node.description && <Item.Description>{repo.node.description}</Item.Description>}
                <Item.Extra>
                  {repo.node.primaryLanguage && (
                    <Fragment>
                      <i className="circle icon" style={{ color: repo.node.primaryLanguage.color }} />
                      <span>{repo.node.primaryLanguage.name}</span>
                    </Fragment>
                  )}
                  <Label>
                    <Icon name="star" /> {repo.node.stargazers.totalCount}
                  </Label>
                  <Label>
                    <Icon name="eye" /> {repo.node.watchers.totalCount}
                  </Label>
                  <Popup
                    content="Copy Clone Command"
                    position="top right"
                    inverted
                    trigger={
                      <Button
                        className="repository__clone"
                        as="div"
                        labelPosition="left"
                        size="mini"
                        onClick={() => {
                          onCopyCloneCommand(repo.node.url, repo.node.id);
                        }}
                      >
                        <Label as="a" basic>
                          Clone
                        </Label>
                        <Button icon>
                          <Icon
                            name={clonedRepoId === repo.node.id ? 'checkmark' : 'copy outline'}
                            color={clonedRepoId === repo.node.id ? 'green' : 'grey'}
                          />
                        </Button>
                      </Button>
                    }
                  />
                </Item.Extra>
                <Divider />
              </Item.Content>
            </Item>
          ))}
        <Button floated="right" content="Next" primary disabled={disableNextButton} onClick={() => getPreviousOrNextRepos('after')} />
        <Button floated="right" content="Previous" primary disabled={page === 1} onClick={() => getPreviousOrNextRepos('before')} />
      </Item.Group>
    </div>
  );
}
