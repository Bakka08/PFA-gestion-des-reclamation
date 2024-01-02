package com.example.demo.idao;

import java.util.List;

public interface IDao<T> {

	void save(T o);

	void delete(T o);

	void update(T o);

	T FindById(int id);

	List<T> findAll();

}