const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand
} = require("@aws-sdk/lib-dynamodb");

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

exports.getTodo = async(event) => {
    const { id } = event.pathParameters;
    const params = {
        TableName: TODO_TABLE,
        Key: { id }
    };

    try{
        const { Item } = await dynamoDbClient.send(new GetCommand(params));
        
        if (!Item) {
            return {
              statusCode: 404,
              body: JSON.stringify({ message: "TODO not found" }),
            };
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify(Item),
        };
    }catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }

}