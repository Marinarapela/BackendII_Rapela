import { UserDTO } from "../dto/userDTO.js";

export default class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }

    register = async (req, res) => {
        try {
            const newUser = await this.sessionService.registerUser(req.body);
            const userDto = new UserDTO(newUser);
            res.status(201).json({ usuarioGenerado: userDto });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await this.sessionService.loginUser(email, password);

            const userDto = new UserDTO(user)
        const token = this.sessionService.generateToken(user); 

        res.status(200).json({
            status: "success",
            usuarioLogueado: userDto,
            token
        });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    };

    getProfile = async (req, res) => {
    try {
        const user = await this.sessionService.getUserProfile(req.user.id);
        const userDto = new UserDTO(user); 

        res.status(200).render("perfil", {
            first_name: userDto.first_name,
            email: userDto.email
        });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
};

    getCurrent = async (req, res) => {
        const userDto = new UserDTO (req.user);
        res.status(200).json({ user: userDto });
    };
}
