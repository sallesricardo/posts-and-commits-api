/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    if (!await knex.schema.hasTable('users')) {
        await knex.schema.createTable('users', function (table) {
            table.increments('id');
            table.string('name', 100);
            table.string('password', 120);
            table.string('email', 191);
            table.timestamps(false, true);
        });
    }
    if (!await knex.schema.hasTable('posts')) {
        await knex.schema.createTable('posts', function (table) {
            table.increments('id');
            table.integer('user_id').unsigned();
            table.string('title', 100);
            table.text('description');
            table.timestamps(false, true);

            table.foreign('user_id').references('users.id');
        });
    }
    if (!await knex.schema.hasTable('comments')) {
        await knex.schema.createTable('comments', function (table) {
            table.increments('id');
            table.integer('user_id').unsigned();
            table.integer('post_id').unsigned();
            table.text('description');
            table.timestamps(false, true);

            table.foreign('user_id').references('users.id');
            table.foreign('post_id').references('posts.id');
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    if (await knex.schema.hasTable('comments')) {
        await knex.schema.dropTable('comments');
    }
    if (await knex.schema.hasTable('posts')) {
        await knex.schema.dropTable('posts');
    }
    if (await knex.schema.hasTable('users')) {
        await knex.schema.dropTable('users');
    }
};

