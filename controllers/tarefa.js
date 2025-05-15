import Task from "../models/tarefa.js";

const createTask = async (req, res) => {
  const defaultStatus = "PENDING";

  try {
    const id_user = req.id;
    console.log(id_user);

    const { description } = req.body;

    if (!description || !id_user) {
      return res.status(400).send({ msg: "dados incopleto meu fi" });
    }

    await Task.create({ description, defaultStatus, id_user });

    return res.status(201).send({ msg: "task criada :D" });
  } catch (err) {
    res.status(500).send({ mensagem: "Ocorreu um erro inesperado: ", err });
  }
};

const listTask = async (req, res) => {
  try {
    //rodar o findAll no model Task
    const id_user = req.id;
    const tasks = await Task.findAll({ where: { id_user } });
    res.status(200).send({ tasks });
  } catch (err) {
    res.status(500).send({ mensagem: "Ocorreu um erro inesperado: ", err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id_user = req.id;
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).send({ mensagem: "Tarefa não encontrada" });
    }

    if (task.id_user == id_user) {
      await Task.destroy({ where: { id, id_user } });
      res.status(200).send({ msg: "chamado deletado (:" });
    } else {
      res.status(404).send({ mensagem: "Esse chamado não é seu ladrão" });
    }
  } catch (err) {
    res.status(500).send({ mensagem: "Ocorreu um erro inesperado: ", err });
  }
};

const changeStatusTask = async (req, res) => {
  try {
    const id_user = req.id;
    const { id } = req.params;
    const { status } = req.body;

    // Verifica se o status foi fornecido e é válido
    const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"]; // Exemplo de status válidos

    if (!validStatuses.includes(status)) {
      return res.status(400).send({ mensagem: "Status inválido" });
    }

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).send({ mensagem: "Tarefa não encontrada" });
    }

    if (task.id_user == id_user) {
      task.status = status;
      await task.save();
      res.status(200).send({ msg: "chamado atualizado (:" });
    } else {
      res.status(404).send({ mensagem: "Esse chamado não é seu ladrão" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

export { createTask, listTask, deleteTask, changeStatusTask };
