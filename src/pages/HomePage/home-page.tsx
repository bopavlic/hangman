import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { saveUserName } from '@/lib/redux/features/user/userSlice';
import { useAppDispatch } from '@/lib/redux/hook';
import { MainTitle } from '@/components/ui/main-title';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [userName, setUserName] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userName.trim()) {
      toast({
        className: 'text-white bg-red-900',
        variant: 'destructive',
        title: 'Name is required',
        description: 'Please enter your name to continue',
      });
      return;
    }
    dispatch(saveUserName(userName));
    navigate('/game');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserName(value);
  };

  return (
    <div className="flex justify-center items-center h-screen p-2 bg-gradient-to-b from-neutral-900 to-zinc-700">
      <div>
        <MainTitle>Welcome to the Hangman Game!</MainTitle>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            className="text-white"
            placeholder="John Doe"
            value={userName}
            onChange={handleChange}
            required
          />
          <Button className="mt-2 text-white" type="submit" variant="outline">
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};
