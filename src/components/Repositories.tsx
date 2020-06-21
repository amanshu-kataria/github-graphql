import React, { Fragment } from 'react';
import UserContext from '../context/UserContext';
import { Button, Divider, Icon, Item, Label, Popup } from 'semantic-ui-react';

export default function Repositories() {
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
                    <Button className="repository__clone" as="div" labelPosition="left">
                      <Label as="a" basic>
                        Clone
                      </Label>
                      <Button icon>
                        <Icon name="copy outline" />
                      </Button>
                    </Button>
                  </Item.Extra>
                  <Divider />
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </div>
      )}
    </UserContext.Consumer>
  );
}
