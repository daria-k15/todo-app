import { Router } from 'express';
const router = Router();
import todoController from '../controller/todoController.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Todo ID
 *         title:
 *           type: string
 *           description: Todo name
 *         description:
 *           type: string
 *           description: Todo description
 *         completed:
 *           type: boolean
 *           description: Status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Created date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Updated date
 */

/**
 * @swagger
 * /api/todos/stats:
 *   get:
 *     summary: Get todo statistics
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Todo statistics
 */
router.get('/stats', todoController.getTodoStats);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: All todo items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 */
router.get('/', todoController.getAll);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a specific todo item
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: todo ID
 *     responses:
 *       200:
 *         description: Todo item
 *       404:
 *         description: A todo with the specified ID was not found
 */
router.get('/:id', todoController.getById);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo item
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: A todo item was successfully created
 *       400:
 *         description: Bad request
 */
router.post('/', todoController.create);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo item
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: A todo item was successfully updated
 *       404:
 *         description: A todo with the specified ID was not found
 */
router.put('/:id', todoController.update);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo item
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: A todo item was successfully deleted
 *       404:
 *         description: A todo with the specified ID was not found
 */
router.delete('/:id', todoController.delete);

export default router;