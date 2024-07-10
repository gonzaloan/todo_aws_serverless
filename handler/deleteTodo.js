const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  DeleteCommand
} = require("@aws-sdk/lib-dynamodb");

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

exports.deleteTodo = async(event) => {
    const { id } = event.pathParameters;
    const params = {
        TableName: TODO_TABLE,
        Key: { id }
    };

    try{
        await dynamoDbClient.send(new DeleteCommand(params));
        
        return {
            statusCode: 204,
            body: JSON.stringify("TODO deleted"),
        };
    }catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }

}