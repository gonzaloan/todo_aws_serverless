const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient
} = require("@aws-sdk/lib-dynamodb");

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

exports.listTodo = async(event) => {
    
    const params = {
        TableName: TODO_TABLE
    };

    try{
        const { Items } = await dynamoDbClient.send(new ScanCommand(params));
        
        return {
            statusCode: 200,
            body: JSON.stringify(Items),
        };
    }catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }

}