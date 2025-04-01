import { response, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { Donation, Explorer, Promoter, Review, Treasure } from "../db/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const client: any = new OAuth2Client(process.env.CLIENT_ID);

interface payload {
  userEmail: string;
}

async function verifyGoogleToken(tokenId: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid Google token");

    return {
      userName: payload.name || "Google User",
      userEmail: payload.email,
    };
  } catch (error) {
    console.error("Google verification error:", error);
    throw new Error("Google authentication failed");
  }
}

// explorer signup
export async function explorerSignup(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { tokenId, username, email, password, contact } = req.body;
    const userType = "explorer";

    if (tokenId) {
      try {
        const { userName, userEmail } = await verifyGoogleToken(tokenId);
        const existingUser = await Explorer.findOne({ userEmail });

        if (existingUser) {
          res.status(409).json({ msg: "User already exists with this email" });
          return;
        }

        await Explorer.create({ userName, userEmail, userType });
        res
          .status(200)
          .json({ msg: "Explorer created successfully with Google login" });
      } catch (error) {
        res.status(400).json({
          msg: "something went wrong with the server",
        });
      }
    } else if (username && email && password && contact) {
      const existingUser = await Explorer.findOne({ userEmail: email });

      if (existingUser) {
        res
          .status(409)
          .json({ msg: "Explorer already exists with this email" });
        return;
      }

      try {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await Explorer.create({
          userName: username,
          userEmail: email,
          userPassword: hashedPassword,
          userContact: contact,
          userType,
        });

        res.status(200).json({
          msg: "Explorer created successfully with traditional sign-up",
        });
      } catch (error) {
        console.error("Password hashing error:", error);
        res.status(500).json({ msg: "Error processing request" });
      }
    } else {
      res
        .status(400)
        .json({ msg: "Required fields are missing for traditional sign-up" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: "Something went wrong with the server" });
  }
}

// explorer login
export async function explorerLogin(req: Request, res: Response) {
  try {
    const { email, password, tokenId } = req.body;

    if (tokenId) {
      // Handle Google login
      try {
        const { userName, userEmail } = await verifyGoogleToken(tokenId);
        let existingUser = await Explorer.findOne({ userEmail });

        if (!existingUser) {
          existingUser = await Explorer.create({
            userName,
            userEmail,
            userType: "explorer",
          });
        }

        const token = jwt.sign(
          { userEmail },
          process.env.JWT_SECRET || "defaultkey",
          {}
        );

        res.status(200).json({ token, msg: "Google login successful" });
      } catch (error) {
        res.status(400).json({
          msg: "something went wrong",
        });
      }
    } else if (email && password) {
      const existingUser = await Explorer.findOne({ userEmail: email });

      if (!existingUser) {
        res.status(403).json({ msg: "No such user found in DB" });
        return;
      }

      if (
        !existingUser.userPassword ||
        typeof existingUser.userPassword !== "string"
      ) {
        res.status(401).json({ msg: "Password is invalid or missing" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.userPassword
      );

      if (!passwordMatch) {
        res.status(403).json({ msg: "Invalid password" });
        return;
      }

      const token = jwt.sign(
        { userEmail: email },
        process.env.JWT_SECRET || "defaultkey",
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({ token, msg: "Login successful" });
    } else {
      res.status(400).json({ msg: "Required fields are missing" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ msg: "Something wrong with the server at the moment" });
  }
}

// fn for explorer to search a treasure
export async function searchTreasure(req: Request, res: Response) {
  try {
    const treasureName = req.body.treasureName;
    if (!treasureName) {
      res.status(401).json({
        msg: "treasure name cannot be left empty",
      });
      return;
    }

    const existingTreasure = await Treasure.findOne({
      treasureName: treasureName,
    });

    if (!existingTreasure) {
      res.status(404).json({
        msg: "no such treasure found in the db",
      });
      return;
    } else {
      res.status(200).json({
        existingTreasure,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something is wrong with the server at the moment",
    });
  }
}

// fn for fetching donation campaigns
export async function fetchDonations(req: Request, res: Response) {
  try {
    const availableDonationCampaigns = await Donation.find({});

    if (!availableDonationCampaigns) {
      res.status(404).json({
        msg: "there isnt any running donation campaign at the moment",
      });
      return;
    } else {
      res.status(200).json({
        availableDonationCampaigns,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}

// fn for adding reviews
export async function addReviews(req: Request, res: Response) {
  try {
    const treasureId = req.params.treasureId;
    const reviewType = req.body.reviewType;
    const reviewComments = req.body.reviewComments;
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        msg: "token not found",
      });
      return;
    }

    const decoded = jwt.decode(token);
    const explorerEmail = (decoded as jwt.JwtPayload).userEmail;

    const explorer = await Explorer.findOne({
      userEmail: explorerEmail,
    });

    const treasure = await Treasure.findOne({
      _id: treasureId,
    });

    const newReview = await Review.create({
      reviewType,
      reviewComments,
      author: explorer?._id,
      reviewOf: treasure?._id,
    });

    await Treasure.updateOne(
      {
        _id: treasureId,
      },
      {
        $push: {
          ratings: newReview,
        },
      }
    );

    const exploredTreasure = await Explorer.findOne({
      exploredHistory: treasureId,
    });

    if (!exploredTreasure) {
      await Explorer.updateOne(
        {
          userEmail: explorerEmail,
        },
        {
          $push: {
            exploredHistory: treasureId,
          },
        }
      );
    }

    await Treasure.updateOne(
      {
        _id: treasureId,
      },
      {
        $inc: {
          visitors: 1,
        },
      }
    );

    res.status(200).json({
      msg: "review added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong while adding the reviews, please try again later!",
    });
  }
}

// fn for fetchin explored treasures
export async function exploredTreasures(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({
        msg: "token not found",
      });
      return;
    }
    const decoded = jwt.decode(token);
    const explorerEmail = (decoded as jwt.JwtPayload).userEmail;
    const explorerData = await Explorer.find({
      userEmail: explorerEmail,
    }).populate("exploredHistory");
    const traveledHistory = explorerData
      .filter((x) => x.exploredHistory && x.exploredHistory.length > 0)
      .map((x) => x.exploredHistory);
    if (traveledHistory.length === 0) {
      res.status(404).json({
        msg: "you have not traveled any treasures yet",
      });
    } else {
      res.status(200).json({
        traveledHistory,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error while fetching your travel history",
    });
  }
}

// fn for fetching promoter leaderboards
export async function leaderboards(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        msg: "unauthorized request",
      });
      return;
    }
    const ranking = await Promoter.find({})
      .select("userName points")
      .sort({ points: 1 });
    res.status(200).json({
      ranking,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the leaderboards",
    });
  }
}

// fn for fetching explorer details
export async function fetchExplorer(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      msg: "unauthorized user",
    });
  }
  try {
    let explorer = await Explorer.findOne({
      userEmail: user,
    });
    if (!explorer) {
      res.status(401).json({
        msg: "no such explorer found",
      });
    } else {
      res.status(200).json({
        explorer,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong with the server",
    });
  }
}

// fn for fetching treasures
export async function fetchTreasure(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      msg: "authorization invalid",
    });
    return;
  }
  try {
    let treasures = await Treasure.find({});
    if (!treasures) {
      res.status(404).json({
        msg: "no treasures found",
      });
      return;
    } else {
      res.status(200).json({
        treasures,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the treasures",
    });
  }
}

// fn for fetching 3 treasures in landing page
export async function landingTreasures(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      msg: "authorization invalid",
    });
    return;
  }
  try {
    let treasures = await Treasure.find({}).limit(3);
    if (!treasures) {
      res.status(404).json({
        msg: "no treasures found",
      });
      return;
    } else {
      res.status(200).json({
        treasures,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the treasures",
    });
  }
}
