const { connectToDb } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
import { SERIES_COLL } from "../../utils/constants";

export default class SeriesManager {
    client;

    constructor() {
        this.client = connectToDb();
        this.client.connect((err) => {
            if (err) {
                console.error("MongoDb Connection error", err);
            } else {
                console.log("MongoDB connected successfully");
            }
        });
    }

    #getCollection = async () => {
        try {
            await this.client.connect();
            const db = this.client.db(process.env.MONGODB_DB);
            const Series = db.collection(SERIES_COLL);
            return Series;
        } catch (err) {
            console.error("MongoDb Connection error", err);
            await this.client.close();
            return null;
        }
    };

    getAllSeries = async () => {
        console.log(`Series.js > getSeries`);

        const Series = await this.#getCollection();
        let res = await Series.find({}).toArray();

        res = res.map((series, index) => {
            console.log(series);
            return {
                id: series._id.toHexString(),
                name: series.name,
            };
        });

        if (res.length > 0) {
            return res;
        } else {
            console.log(`No Series found`);
            return null;
        }
    };

    getSeriesByName = async (nameSeries) => {
        console.log(`series.js > getCategories`);

        const Series = await this.#getCollection();
        let res = await Series.find({ name: nameSeries }).toArray();

        res = res.map((series) => {
            return {
                id: series._id.toHexString(),
                name: series.name,
            };
        });

        if (res.length > 0) {
            console.log(res);
            return res[0];
        } else {
            console.log(`No series found`);
            return null;
        }
    };

    addSeries = async (series) => {
        console.log(`series.js > addSeries: ${series}`);

        const Series = await this.#getCollection();
        return await Series.insertOne(series);
    };

    upsertSeries = async (series) => {
        console.log(`series.js > updateSeries: ${series}`);

        const categoryCollection = await this.#getCollection();
        return await categoryCollection.findAndModify({
            query: { name: series.name},
            update: {
                $setOnInsert: series
            },
            new: true,   // return new doc if one is upserted
            upsert: true // insert the document if it does not exist
        })
        // .updateOne(
        //   { name: category.name },
        //   { $set: category }, { upsert: true });
    };



    deleteSeriesById = async (id) => {
        console.log(`series.js > deleteSeries: ${id}`);

        const Series = await this.#getCollection();
        const res = await Series.deleteOne({ _id: new ObjectId(id) });
        return res.deletedCount > 0;
    };

    deleteSeriesByName = async (nameSeries) => {
        console.log(`series.js > deleteSeries: ${nameSeries}`);

        const Series = await this.#getCollection();
        const res = await Series.deleteOne({ name: nameSeries });
        return res.deletedCount > 0;
    };
}
