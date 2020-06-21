import React, { Fragment, useState } from 'react';
import UserContext from '../context/UserContext';
import { Button, Divider, Icon, Item, Label, Popup } from 'semantic-ui-react';

export default function Repositories() {
  const [clonedRepoId, setClonedRepoId] = useState('');

  function onCopyCloneCommand(command: string, repoId: string) {
    navigator.clipboard.writeText(`git clone ${command}.git`);
    setClonedRepoId(repoId);
    setTimeout(() => {
      setClonedRepoId('');
    }, 2000);
  }

  return (
    <UserContext.Consumer>
      {(props: any) => (
        <div className="repositories">
          <Item.Group>
            {props.repositories.edges.map((repo: any) => (
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
            <Button floated="right" content="Next" primary />
            <Button floated="right" content="Previous" primary disabled />
          </Item.Group>
        </div>
      )}
    </UserContext.Consumer>
  );
}
