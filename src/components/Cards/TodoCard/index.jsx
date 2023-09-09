import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Input, Textarea, Select, Stack, HStack, Card, Heading, Text } from "@chakra-ui/react";
import { ModalComponent } from "../../Modal";
import api from "../../../services/api";

export const TodoCard = ({ id, title, description, status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpenConfirm = () => {
    setShowConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e?.currentTarget);

    const body = {
      task_name: formData?.get("task_name"),
      task_description: formData?.get("task_description"),
      task_status: formData?.get("task_status"),
    };

    api.put("/todo-list/" + id, body).then(() => {
      setOpenModal(false);
      location.reload();
    });
  };

  const deleteTodo = async () => {
    api.delete("/todo-list/" + id).then(() => {
      setOpenModal(false);
      location.reload();
    });
  };

  return (
    <Card width="100%" p={4}>
      <Heading as="h1" size="sm">
        {title}
      </Heading>
      <Text mt={3}>{description}</Text>
      <HStack spacing=".5rem">
        <Text color="red" cursor="pointer" onClick={handleOpenConfirm}>
          Hapus
        </Text>
        <Text>|</Text>
        <Text color="blue" cursor="pointer" onClick={handleOpenModal}>
          Edit
        </Text>
      </HStack>
      <ModalComponent title="Tugas baru" openModal={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <HStack spacing="24px">
              <Text w={"35%"} fontWeight={600}>
                Nama Tugas
              </Text>
              <Input placeholder="Tugas 1 : Belajar HTML" defaultValue={title} name="task_name" />
            </HStack>
            <HStack spacing="24px">
              <Text w={"35%"} fontWeight={600}>
                Deskripsi
              </Text>
              <Textarea placeholder="Buat contoh struktur HTML sederhana untuk pembuatan aplikasi web" defaultValue={description} name="task_description" />
            </HStack>
            <HStack spacing="24px">
              <Text w={"35%"} fontWeight={600}>
                Status
              </Text>
              <Select defaultValue={status} name="task_status">
                <option value="open">Open</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
              </Select>
            </HStack>
          </Stack>
          <Button type="submit" colorScheme="blue" mt={4}>
            Simpan
          </Button>
        </form>
      </ModalComponent>

      <ModalComponent title="" openModal={showConfirm} onClose={() => setShowConfirm(false)}>
        <Text>Apakah anda yakin ingin menghapus data ini?</Text>
        <HStack spacing="1rem" justifyContent="end">
          <Button colorScheme="red" mt={4} onClick={() => setShowConfirm(false)}>
            Batal
          </Button>
          <Button colorScheme="blue" mt={4} onClick={deleteTodo}>
            Ya
          </Button>
        </HStack>
      </ModalComponent>
    </Card>
  );
};

TodoCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
