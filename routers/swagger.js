/**
 * @swagger
 * /users:
 *  get:
 *      summary: Used to get all uses
 *      description: Used to get all uses
 *      responses:
 *          '200':
 *              description: A successful response
 */
/**
 * @swagger
 * /user/{userId}:
 *  get:
 *      summary: Used to get a user by id
 *      description: Used to get a user by id
 *      parameters:
 *          - name: userId
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: A successful response
 */
/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Used to signup a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response, with **otp** sent to the user email
 *      '409':
 *        description: User email already exist
 *      '400':
 *        description: Request error
 */
/**
 * @swagger
 * /checkcode:
 *  post:
 *      summary: Used to login a new user with the OTP and generate a JWT token
 *      description: Used to login a new user with the OTP and generate a JWT token
 *      responses:
 *          '200':
 *              description: A successful response, with the user JWT token
 */
