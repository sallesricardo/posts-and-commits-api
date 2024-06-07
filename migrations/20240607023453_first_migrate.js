/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    if (!await knex.schema.hasTable('users')) {
        return knex.schema.createTable('users', function (table) {
            table.increments('id');
            table.string('name', 100);
            table.string('password', 120);
            table.string('email', 191);
            table.timestamps();
        });
    }
    if (!await knex.schema.hasTable('posts')) {
        return knex.schema.createTable('posts', function (table) {
            table.increments('id');
            table.integer('user_id');
            table.string('title', 100);
            table.text('description');
            table.foreign('user_id').references('users.id');
        });
    }
    if (!await knex.schema.hasTable('comments')) {
        return knex.schema.createTable('comments', function (table) {
            table.increments('id');
            table.integer('user_id');
            table.integer('post_id');
            table.text('description');
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
    if (await knex.schema.hasTable('users')) {
        return knex.schema.dropTable('users');
    }
    if (await knex.schema.hasTable('posts')) {
        return knex.schema.dropTable('posts');
    }
    if (await knex.schema.hasTable('comments')) {
        return knex.schema.dropTable('comments');
    }
};

