-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    avatar text COLLATE pg_catalog."default",
    "timestamp" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.games

-- DROP TABLE IF EXISTS public.games;

CREATE TABLE IF NOT EXISTS public.games
(
    id uuid NOT NULL,
    host_id integer NOT NULL,
    status text COLLATE pg_catalog."default" DEFAULT 'WAITING'::text,
    created_at timestamp without time zone DEFAULT now(),
    tokens_position jsonb,
    current_turn integer DEFAULT 1,
    CONSTRAINT games_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.games
    OWNER to postgres;


-- Table: public.players

-- DROP TABLE IF EXISTS public.players;

CREATE TABLE IF NOT EXISTS public.players
(
    id integer NOT NULL,
    user_id integer,
    game_id uuid NOT NULL,
    is_host boolean DEFAULT false,
    place integer NOT NULL,
    CONSTRAINT players_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.players
    OWNER to postgres;



-- Type: difficulty
CREATE TYPE difficulty AS ENUM ('LVL1', 'LVL2');



-- Table: public.questions

-- DROP TABLE IF EXISTS public.questions;

CREATE TABLE IF NOT EXISTS public.questions
(
    id integer NOT NULL,
    text text COLLATE pg_catalog."default" NOT NULL,
    options jsonb NOT NULL,
    difficulty difficulty,
    correct_answer text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT questions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.questions
    OWNER to postgres;



-- Table: public.messages

-- DROP TABLE IF EXISTS public.messages;

CREATE TABLE IF NOT EXISTS public.messages
(
    id integer NOT NULL,
    text text COLLATE pg_catalog."default" NOT NULL,
    player_id integer NOT NULL,
    game_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT message_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.messages
    OWNER to postgres;