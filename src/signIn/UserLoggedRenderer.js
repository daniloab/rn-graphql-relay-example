import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../../relay/environment";
import { Text, View } from "react-native";

const UserLoggedRenderer = () => {
  const renderContent = (viewer) => {
    if (!viewer?.user) {
      return <Text>User logged</Text>;
    }

    const { user } = viewer;

    return (
      <View style={{ marginTop: 15, alignItems: "center" }}>
        <Text>User {user?.username || user?.email} logged</Text>
      </View>
    );
  };

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query UserLoggedRendererQuery {
          viewer {
            user {
              id
              createdAt
              updatedAt
              username
            }
            sessionToken
          }
        }
      `}
      variables={null}
      render={({ error, props }) => {
        if (error) {
          return (
            <View>
              <Text>{error.message}</Text>
            </View>
          );
        } else if (props) {
          return renderContent(props.viewer);
        }
        return (
          <View>
            <Text>loading</Text>
          </View>
        );
      }}
    />
  );
};

export default UserLoggedRenderer;
