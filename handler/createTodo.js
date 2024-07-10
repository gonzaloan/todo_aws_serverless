const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4} = require("uuid")

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

exports.createTodo = async(event) => {
    const body = JSON.parse(event.body);
    const {todo} = body;
    const todoId = uuidv4();
    const params = {
        TableName: TODO_TABLE,
        Item: {
            id: todoId,
            todo: todo,
            checked: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    };

    try{
        await dynamoDbClient.send(new PutCommand(params));
        return {
            statusCode: 201,
            body: JSON.stringify(params.Item),
        };
    }catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }

}