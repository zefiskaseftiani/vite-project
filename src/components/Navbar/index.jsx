import { useState } from "react";
import { ModalComponent } from "../Modal";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Image, Button, HStack, Text, Stack, Input, Textarea, Select } from "@chakra-ui/react";
import api from "../../services/api";

export const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e?.currentTarget);

    const body = {
      task_name: formData?.get("task_name"),
      task_description: formData?.get("task_description"),
      task_status: formData?.get("task_status"),
    };

    api.post("/todo-list", body).then(() => {
      setOpenModal(false);
      location.reload();
    });
  };

  return (
    <>
      <Flex paddingX={6} paddingY={4}>
        <Box>
          <Image w={220} h="auto" src="/static/images/logo.png" alt="Update Icon" />
        </Box>
        <Spacer />
        <Box>
          <Button colorScheme="blue" onClick={handleOpenModal}>
            <HStack spacing={2}>
              <AddIcon />
              <Text>Tambah Tugas</Text>
            </HStack>
          </Button>
        </Box>
      </Flex>
      <ModalComponent title="Tugas baru" openModal={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <HStack spacing="24px">
              <Text w="35%" fontWeight={600}>
                Nama Tugas
              </Text>
              <Input placeholder="Tugas 1 : Belajar HTML" name="task_name" />
            </HStack>
            <HStack spacing="24px">
              <Text w="35%" fontWeight={600}>
                Deskripsi
              </Text>
              <Textarea placeholder="Buat contoh struktur HTML sederhana untuk pembuatan aplikasi web" name="task_description" />
            </HStack>
            <HStack spacing="24px">
              <Text w="35%" fontWeight={600}>
                Status
              </Text>
              <Select name="task_status">
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
    </>
  );
};
