const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  UpdateCommand
} = require("@aws-sdk/lib-dynamodb");

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

exports.updateTodo = async(event) => {
    const { id } = event.pathParameters;
    const {todo, checked} = JSON.parse(event.body);
    const datetime = new Date().toISOString();
    const params = {
        TableName: TODO_TABLE,
        Key: { id },
        UpdateExpression: 'SET todo = :todo, checked = :checked, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
            ':todo': todo,
            ':checked': checked,
            ':updatedAt': datetime
        },
        ReturnValues: 'ALL_NEW'
    };

    try{
        const result = await dynamoDbClient.send(new UpdateCommand(params));
        
        
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    }catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }

}